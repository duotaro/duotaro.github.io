"use client";
import { useState, useEffect } from "react";

const TASKS = [
  // 投資
  { 
    id: "orderflow-study", 
    category: "investment",
    categoryLabel: "🪙 投資",
    label: "OFトレード学習", 
    points: 3,
    days: [1, 2, 3, 4, 5], // 平日毎日
    time: "10:00"
  },
  { 
    id: "defi-review", 
    category: "investment",
    categoryLabel: "🪙 投資",
    label: "DeFi運用見直し", 
    points: 2,
    days: [1], // 月曜
    time: "11:00"
  },
  // コンテンツ作成
  { 
    id: "note-writing", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "OF学習noteまとめ", 
    points: 3,
    days: [1], // 月曜
    time: "12:00"
  },
  { 
    id: "sns-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "note要点をSNSに投稿", 
    points: 2,
    days: [2, 4], // 火曜・木曜
    time: "Orderflow学習後"
  },
  // 学習
  { 
    id: "future-tech-study", 
    category: "learning",
    categoryLabel: "🧠 学習（先端技術）",
    label: "先端技術に関する学習", 
    points: 2,
    days: [2, 4], // 火曜・木曜
    time: "11:00"
  },
  // トレーニング
  { 
    id: "pomodoro-exercise", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "筋トレ・ストレッチ(ポモドーロ)", 
    points: 2,
    days: [1, 2, 3, 4, 5], // 平日毎日
    time: "各25分作業後の5分休憩中"
  },
  { 
    id: "night-exercise", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "筋トレ・ストレッチ(夜)", 
    points: 2,
    days: [1, 2, 3, 4, 5, 6, 7], // 毎日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "meal-record", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "食事記録", 
    points: 1,
    days: [0, 1, 2, 3, 4, 5, 6], // 毎日
    time: "各食後"
  },
  { 
    id: "weight-record", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "体重記録", 
    points: 1,
    days: [0, 1, 2, 3, 4, 5, 6], // 毎日
    time: "入浴後"
  }
];

const CATEGORY_COLORS = {
  investment: "from-yellow-400 to-orange-500",
  content: "from-purple-400 to-pink-500",
  learning: "from-blue-400 to-cyan-500",
  training: "from-green-400 to-emerald-500"
};

export default function Home() {
  const [points, setPoints] = useState({});
  const [todayDone, setTodayDone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [rewardSetting, setRewardSetting] = useState("100ptでラーメンを食べて良いこととする");
  const [isEditingReward, setIsEditingReward] = useState(false);
  const [tempRewardText, setTempRewardText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // 今日の日付と曜日を取得
  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  const getTodayDayOfWeek = () => {
    return new Date().getDay(); // 0=日曜, 1=月曜, ..., 6=土曜
  };

  // 今日やるべきタスクを取得
  const getTodayTasks = () => {
    const today = getTodayDayOfWeek();
    return TASKS.filter(task => task.days.includes(today));
  };

  // 今日完了したタスクを取得
  const getCompletedTodayTasks = () => {
    return TASKS.filter(task => todayDone.includes(task.id));
  };

  // 追加可能なタスクを取得（今日の予定外で未完了のもの）
  const getAddableTasks = () => {
    const todayTaskIds = getTodayTasks().map(task => task.id);
    return TASKS.filter(task => 
      !todayTaskIds.includes(task.id) && !todayDone.includes(task.id)
    );
  };

  // 開始日からの経過日数を計算
  const getDayCount = () => {
    if (!startDate) return 1;
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diffDays);
  };

  // コンポーネントマウント後に読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPoints = JSON.parse(localStorage.getItem("habitPoints") || "{}");
      const storedCompletion = JSON.parse(localStorage.getItem("habitCompletion") || "{}");
      const storedStartDate = localStorage.getItem("habitStartDate");
      const storedRewardSetting = localStorage.getItem("habitRewardSetting");
      const today = getTodayString();
      
      setPoints(storedPoints);
      
      if (storedRewardSetting) {
        setRewardSetting(storedRewardSetting);
      }
      
      if (storedStartDate) {
        setStartDate(storedStartDate);
      } else {
        localStorage.setItem("habitStartDate", today);
        setStartDate(today);
      }
      
      if (storedCompletion.date === today) {
        setTodayDone(storedCompletion.completed || []);
      }
      
      setIsLoaded(true);
    }
  }, []);

  // データ保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habitPoints", JSON.stringify(points));
    }
  }, [points, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const today = getTodayString();
      const completionData = { date: today, completed: todayDone };
      localStorage.setItem("habitCompletion", JSON.stringify(completionData));
    }
  }, [todayDone, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habitRewardSetting", rewardSetting);
    }
  }, [rewardSetting, isLoaded]);

  const handleComplete = (taskId) => {
    if (todayDone.includes(taskId)) return;
    const task = TASKS.find(t => t.id === taskId);
    const pointsToAdd = task ? task.points : 1;
    setPoints((prev) => ({ ...prev, [taskId]: (prev[taskId] || 0) + pointsToAdd }));
    setTodayDone((prev) => [...prev, taskId]);
  };

  const startEditingReward = () => {
    setTempRewardText(rewardSetting);
    setIsEditingReward(true);
  };

  const saveRewardSetting = () => {
    setRewardSetting(tempRewardText);
    setIsEditingReward(false);
  };

  const cancelEditingReward = () => {
    setTempRewardText("");
    setIsEditingReward(false);
  };

  const totalPoints = Object.values(points).reduce((sum, v) => sum + v, 0);
  const todayTasks = getTodayTasks();
  const completedTodayTasks = getCompletedTodayTasks();
  const addableTasks = getAddableTasks();
  
  const todayPoints = completedTodayTasks.reduce((sum, task) => sum + task.points, 0);
  
  // 達成率の計算を修正：今日のタスクが0個の場合は0%、そうでなければ正しく計算
  const completionRate = todayTasks.length > 0 
    ? Math.round((todayTasks.filter(task => todayDone.includes(task.id)).length / todayTasks.length) * 100)
    : 0;

  const dayCount = getDayCount();

  // SNS用テキスト生成
  const generateShareText = () => {
    const completedTasksText = completedTodayTasks.map(task => 
      `✅ ${task.label}（+${task.points}pt）`
    );
    
    let shareText = `#習慣ログ Day${dayCount}\n`;
    
    if (completedTasksText.length > 0) {
      shareText += completedTasksText.join('\n') + '\n';
    }
    
    shareText += `🎯 今日の合計：${todayPoints}pt\n`;
    shareText += `📈 累計ポイント：${totalPoints}pt\n`;
   // shareText += `🪙${rewardSetting}✨\n`;
    shareText += `#日々コツコツ #習慣化`;
    
    return shareText;
  };

  const shareText = generateShareText();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto"></div>
          <div className="text-white text-xl">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="text-center mb-8 pt-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">習慣化アプリ</h1>
          <div className="text-purple-200 text-sm bg-white/10 rounded-full px-3 py-1 inline-block">
            Day {dayCount}
          </div>
        </div>

        {/* 進捗サマリー */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalPoints}</div>
              <div className="text-purple-200 text-xs">累計pt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">{todayPoints}</div>
              <div className="text-purple-200 text-xs">今日pt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{completionRate}%</div>
              <div className="text-purple-200 text-xs">達成率</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="text-purple-200 text-xs text-center">
              {todayTasks.filter(task => todayDone.includes(task.id)).length} / {todayTasks.length} タスク完了
            </div>
          </div>
        </div>

        {/* 今日のタスク */}
        {todayTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-4 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-2"></div>
              今日の予定
            </h2>
            <div className="space-y-3">
              {todayTasks.map((task) => {
                const isCompleted = todayDone.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 transition-all duration-300 ${
                      isCompleted 
                        ? 'opacity-70 bg-green-500/10 border-green-400/30' 
                        : 'hover:bg-white/15 hover:scale-[1.02] hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-purple-200 bg-white/10 px-2 py-1 rounded-full">
                            {task.categoryLabel}
                          </span>
                          <span className="text-yellow-300 text-xs font-bold">+{task.points}pt</span>
                        </div>
                        <h3 className="text-white font-medium text-sm leading-tight mb-2">{task.label}</h3>
                        <div className="text-purple-200 text-xs">⏰ {task.time}</div>
                      </div>
                      <button
                        onClick={() => handleComplete(task.id)}
                        disabled={isCompleted}
                        className={`ml-3 flex-shrink-0 w-12 h-12 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-500/30 text-green-200 cursor-not-allowed"
                            : `bg-gradient-to-r ${CATEGORY_COLORS[task.category]} hover:shadow-lg hover:scale-110 text-white shadow-lg`
                        }`}
                      >
                        {isCompleted ? "✓" : "完了"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 追加タスクセクション */}
        {addableTasks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-2"></div>
                追加タスク
              </h2>
              <button
                onClick={() => setShowAddTask(!showAddTask)}
                className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
              >
                {showAddTask ? '閉じる' : '表示'}
              </button>
            </div>
            
            {showAddTask && (
              <div className="space-y-3">
                {addableTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-purple-300 bg-white/5 px-2 py-1 rounded-full">
                            {task.categoryLabel}
                          </span>
                          <span className="text-yellow-400 text-xs font-bold">+{task.points}pt</span>
                        </div>
                        <h3 className="text-white/90 font-medium text-sm leading-tight mb-2">{task.label}</h3>
                        <div className="text-purple-300 text-xs">⏰ {task.time}</div>
                      </div>
                      <button
                        onClick={() => handleComplete(task.id)}
                        className={`ml-3 flex-shrink-0 w-12 h-12 rounded-full text-xs transition-all duration-200 flex items-center justify-center bg-gradient-to-r ${CATEGORY_COLORS[task.category]} hover:shadow-lg hover:scale-110 text-white shadow-lg opacity-80 hover:opacity-100`}
                      >
                        追加
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 完了済みタスク */}
        {completedTodayTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-4 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2"></div>
              完了済み
            </h2>
            <div className="space-y-2">
              {completedTodayTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-green-500/10 backdrop-blur-xl rounded-xl p-3 border border-green-400/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-green-200 text-sm">{task.label}</span>
                    <span className="text-green-300 text-xs font-bold">+{task.points}pt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ご褒美設定 */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
          <h2 className="text-white font-semibold mb-3 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mr-2"></div>
            ご褒美設定
          </h2>
          {isEditingReward ? (
            <div className="space-y-3">
              <input
                type="text"
                value={tempRewardText}
                onChange={(e) => setTempRewardText(e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="例: 100ptでラーメンを食べて良いこととする"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveRewardSetting}
                  className="flex-1 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  保存
                </button>
                <button
                  onClick={cancelEditingReward}
                  className="flex-1 py-2 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                >
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-purple-200 text-sm flex items-center">
                🪙 {rewardSetting} ✨
              </p>
              <button
                onClick={startEditingReward}
                className="px-4 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                編集
              </button>
            </div>
          )}
        </div>

        {/* SNS用テキスト */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
          <h2 className="text-white font-semibold mb-3 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
            SNS用テキスト
          </h2>
          <textarea
            value={shareText}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}