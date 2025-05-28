"use client";
import { useState, useEffect } from "react";

const TASKS = [
  // 投資
  { 
    id: "orderflow-study", 
    category: "investment",
    categoryLabel: "🪙 投資",
    label: "OFトレード学習", 
    points: 5,
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
    points: 4,
    days: [1], // 月曜
    time: "12:00"
  },
  { 
    id: "sns-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "note要点をSNSに投稿", 
    points: 3,
    days: [2, 4], // 火曜・木曜
    time: "Orderflow学習後"
  },
  // 学習
  { 
    id: "future-tech-study", 
    category: "learning",
    categoryLabel: "🧠 学習（先端技術）",
    label: "先端技術に関する学習", 
    points: 5,
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
  },
  { 
    id: "daily-reflection", 
    category: "reflection",
    categoryLabel: "📝 振り返り",
    label: "日次レビュー", 
    points: 1,
    days: [0, 1, 2, 3, 4, 5, 6], // 毎日
    time: "就寝前"
  },
  { 
    id: "weekly-reflection", 
    category: "reflection",
    categoryLabel: "📝 振り返り",
    label: "週次レビュー", 
    points: 5,
    days: [6], // 日曜日
    time: "就寝前"
  },
  { 
    id: "monthly-reflection", 
    category: "reflection",
    categoryLabel: "📝 振り返り",
    label: "月次レビュー", 
    points: 10,
    days: [6], // 日曜日
    time: "就寝前"
  },
  // 新機能：ビジュアライゼーション
  { 
    id: "vision-meditation", 
    category: "visualization",
    categoryLabel: "🎯 ビジュアライゼーション",
    label: "目標イメージング", 
    points: 3,
    days: [1, 3, 5], // 月水金
    time: "朝一番"
  },
  // 新機能：セルフトーク
  { 
    id: "self-talk", 
    category: "selftalk",
    categoryLabel: "💪 セルフトーク",
    label: "ポジティブセルフトーク", 
    points: 2,
    days: [0, 1, 2, 3, 4, 5, 6], // 毎日
    time: "朝の準備中"
  }
];

const CATEGORY_COLORS = {
  investment: "from-yellow-400 to-orange-500",
  content: "from-purple-400 to-pink-500",
  learning: "from-blue-400 to-cyan-500",
  training: "from-green-400 to-emerald-500",
  reflection: "from-indigo-400 to-violet-500",
  visualization: "from-teal-400 to-sky-500",
  selftalk: "from-rose-400 to-red-500",
  mindfulness: "from-amber-400 to-yellow-500",
  planning: "from-slate-400 to-gray-500",
  motivation: "from-fuchsia-400 to-purple-500",
  analysis: "from-cyan-400 to-blue-500",
  wellness: "from-lime-400 to-green-500",
  creativity: "from-pink-400 to-rose-500",
  productivity: "from-emerald-400 to-teal-500"
};

// デフォルト目標設定
const DEFAULT_GOALS = [
  {
    id: "financial-freedom",
    title: "経済的自由の達成",
    description: "投資とコンテンツ収益で月100万円の不労所得を得る",
    targetDate: "2026-12-31",
    category: "investment",
    progress: 0,
    milestones: [
      { title: "月10万円達成", target: 25, completed: false },
      { title: "月30万円達成", target: 50, completed: false },
      { title: "月50万円達成", target: 75, completed: false },
      { title: "月100万円達成", target: 100, completed: false }
    ]
  },
  {
    id: "expertise-building",
    title: "専門性の確立",
    description: "先端技術とトレーディングの専門家として認知される",
    targetDate: "2025-12-31",
    category: "learning",
    progress: 0,
    milestones: [
      { title: "基礎知識習得", target: 30, completed: false },
      { title: "実践経験積み重ね", target: 60, completed: false },
      { title: "成果発信開始", target: 80, completed: false },
      { title: "専門家として認知", target: 100, completed: false }
    ]
  },
  {
    id: "health-optimization",
    title: "最適な身体作り",
    description: "理想的な体型と健康状態を維持し続ける",
    targetDate: "2025-06-30",
    category: "training",
    progress: 0,
    milestones: [
      { title: "体重目標達成", target: 40, completed: false },
      { title: "筋力目標達成", target: 70, completed: false },
      { title: "習慣の定着", target: 90, completed: false },
      { title: "理想体型の維持", target: 100, completed: false }
    ]
  }
];

// デフォルトセルフトークメッセージ
const DEFAULT_SELF_TALK = [
  "今日も確実に目標に向かって前進している",
  "小さな行動の積み重ねが大きな変化を生む",
  "私は成長し続ける人間だ",
  "困難は成長のチャンスである",
  "今この瞬間が未来を作っている",
  "私の努力は必ず報われる",
  "毎日が新しい可能性に満ちている",
  "理想の自分に近づいている",
  "チャレンジすることで強くなる",
  "今日できることに集中しよう"
];

export default function Home() {
  const [currentView, setCurrentView] = useState("tasks"); // tasks, goals, selftalk
  const [points, setPoints] = useState({});
  const [todayDone, setTodayDone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [rewardSetting, setRewardSetting] = useState("100ptでラーメンを食べてOK");
  const [isEditingReward, setIsEditingReward] = useState(false);
  const [tempRewardText, setTempRewardText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  
  // 新機能のstate
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [selfTalkMessages, setSelfTalkMessages] = useState(DEFAULT_SELF_TALK);
  const [currentSelfTalk, setCurrentSelfTalk] = useState("");
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSelfTalkForm, setShowSelfTalkForm] = useState(false);

  // 今日の日付と曜日を取得
  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  const getTodayDayOfWeek = () => {
    return new Date().getDay();
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

  // 追加可能なタスクを取得
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

  // ランダムセルフトークを取得
  const getRandomSelfTalk = () => {
    return selfTalkMessages[Math.floor(Math.random() * selfTalkMessages.length)];
  };

  // コンポーネントマウント後に読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPoints = JSON.parse(localStorage.getItem("habitPoints") || "{}");
      const storedCompletion = JSON.parse(localStorage.getItem("habitCompletion") || "{}");
      const storedStartDate = localStorage.getItem("habitStartDate");
      const storedRewardSetting = localStorage.getItem("habitRewardSetting");
      const storedGoals = JSON.parse(localStorage.getItem("habitGoals") || "null");
      const storedSelfTalk = JSON.parse(localStorage.getItem("habitSelfTalk") || "null");
      const today = getTodayString();
      
      setPoints(storedPoints);
      
      if (storedRewardSetting) {
        setRewardSetting(storedRewardSetting);
      }
      
      if (storedGoals) {
        setGoals(storedGoals);
      }
      
      if (storedSelfTalk) {
        setSelfTalkMessages(storedSelfTalk);
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
      
      // 今日のセルフトークを設定
      setCurrentSelfTalk(getRandomSelfTalk());
      
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

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habitGoals", JSON.stringify(goals));
    }
  }, [goals, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habitSelfTalk", JSON.stringify(selfTalkMessages));
    }
  }, [selfTalkMessages, isLoaded]);

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

  // 目標の進捗更新
  const updateGoalProgress = (goalId, newProgress) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.max(0, Math.min(100, newProgress)) }
        : goal
    ));
  };

  // セルフトークメッセージ追加
  const addSelfTalkMessage = (message) => {
    if (message.trim() && !selfTalkMessages.includes(message.trim())) {
      setSelfTalkMessages(prev => [...prev, message.trim()]);
    }
  };

  // セルフトークメッセージ削除
  const removeSelfTalkMessage = (index) => {
    setSelfTalkMessages(prev => prev.filter((_, i) => i !== index));
  };

  const totalPoints = Object.values(points).reduce((sum, v) => sum + v, 0);
  const todayTasks = getTodayTasks();
  const completedTodayTasks = getCompletedTodayTasks();
  const addableTasks = getAddableTasks();
  
  const todayPoints = completedTodayTasks.reduce((sum, task) => sum + task.points, 0);
  
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
    shareText += `💪 "${currentSelfTalk}"\n`;
    shareText += `#日々コツコツ #習慣化 #目標達成`;
    
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
        <div className="text-center mb-6 pt-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">習慣化アプリ</h1>
          <div className="text-purple-200 text-sm bg-white/10 rounded-full px-3 py-1 inline-block">
            Day {dayCount}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl p-1 mb-6 border border-white/20">
          {[
            { key: "tasks", label: "📋 タスク", icon: "📋" },
            { key: "goals", label: "🎯 目標", icon: "🎯" },
            { key: "selftalk", label: "💪 マインド", icon: "💪" }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key)}
              className={`flex-1 py-3 px-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                currentView === key
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {currentView === "tasks" && (
          <>
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

            {/* セルフトークバナー */}
            <div className="bg-gradient-to-r from-rose-400/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-rose-300/30">
              <div className="text-center">
                <div className="text-xs text-rose-200 mb-1">今日のセルフトーク</div>
                <div className="text-white font-medium text-sm leading-relaxed">
                  💫 "{currentSelfTalk}"
                </div>
                <button
                  onClick={() => setCurrentSelfTalk(getRandomSelfTalk())}
                  className="mt-2 text-xs text-rose-300 hover:text-rose-200 transition-colors"
                >
                  🔄 別のメッセージ
                </button>
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
          </>
        )}

        {currentView === "goals" && (
          <div className="space-y-6">
            {/* 目標一覧 */}
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">{goal.title}</h3>
                      <p className="text-purple-200 text-sm mb-3">{goal.description}</p>
                      <div className="flex items-center gap-4 text-xs text-purple-300">
                        <span>📅 {goal.targetDate}</span>
                        <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[goal.category]} text-white`}>
                          {TASKS.find(t => t.category === goal.category)?.categoryLabel || "🎯"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingGoal(goal)}
                      className="text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      ✏️
                    </button>
                  </div>

                  {/* 進捗バー */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-semibold">進捗: {goal.progress}%</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateGoalProgress(goal.id, goal.progress - 5)}
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateGoalProgress(goal.id, goal.progress + 5)}
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${CATEGORY_COLORS[goal.category]} h-3 rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* マイルストーン */}
                  <div className="space-y-2">
                    <h4 className="text-white text-sm font-semibold mb-2">マイルストーン</h4>
                    {goal.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          goal.progress >= milestone.target
                            ? 'bg-green-500/20 border border-green-400/30'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            goal.progress >= milestone.target
                              ? 'bg-green-500 text-white'
                              : 'bg-white/20 text-purple-200'
                          }`}>
                            {goal.progress >= milestone.target ? '✓' : index + 1}
                          </div>
                          <span className={`text-sm ${
                            goal.progress >= milestone.target ? 'text-green-200' : 'text-white'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                        <span className="text-xs text-purple-300">{milestone.target}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 目標追加ボタン */}
            <button
              onClick={() => setShowGoalForm(true)}
              className="w-full py-4 bg-gradient-to-r from-teal-400 to-sky-500 text-white rounded-2xl font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              新しい目標を追加
            </button>
          </div>
        )}

        {currentView === "selftalk" && (
          <div className="space-y-6">
            {/* 今日のセルフトーク */}
            <div className="bg-gradient-to-r from-rose-400/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 border border-rose-300/30 text-center">
              <h2 className="text-white font-bold text-xl mb-4">今日のマインドセット</h2>
              <div className="text-white text-lg font-medium leading-relaxed mb-4 p-4 bg-white/10 rounded-2xl">
                "💫 {currentSelfTalk}"
              </div>
              <button
                onClick={() => setCurrentSelfTalk(getRandomSelfTalk())}
                className="bg-gradient-to-r from-rose-400 to-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                🔄 新しいメッセージ
              </button>
            </div>

            {/* セルフトーク一覧 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-red-500 rounded-full mr-2"></div>
                  セルフトークメッセージ
                </h2>
                <button
                  onClick={() => setShowSelfTalkForm(true)}
                  className="text-rose-300 hover:text-rose-200 transition-colors text-sm"
                >
                  + 追加
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selfTalkMessages.map((message, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <p className="text-white text-sm leading-relaxed flex-1 mr-3">
                      "{message}"
                    </p>
                    <button
                      onClick={() => removeSelfTalkMessage(index)}
                      className="text-rose-300 hover:text-rose-200 opacity-0 group-hover:opacity-100 transition-all text-xs"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* モチベーション統計 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
              <h3 className="text-white font-semibold mb-3">モチベーション統計</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-300">{selfTalkMessages.length}</div>
                  <div className="text-purple-200 text-xs">メッセージ数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">{dayCount}</div>
                  <div className="text-purple-200 text-xs">継続日数</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 目標追加/編集フォーム */}
        {(showGoalForm || editingGoal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-white font-bold text-xl mb-4">
                {editingGoal ? '目標を編集' : '新しい目標を追加'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-purple-200 text-sm mb-2 block">目標タイトル</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="例: 経済的自由の達成"
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-2 block">詳細説明</label>
                  <textarea
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 h-20 resize-none"
                    placeholder="目標の詳細を入力してください"
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-2 block">達成予定日</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowGoalForm(false);
                      setEditingGoal(null);
                    }}
                    className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => {
                      setShowGoalForm(false);
                      setEditingGoal(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-teal-400 to-sky-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    {editingGoal ? '更新' : '追加'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* セルフトーク追加フォーム */}
        {showSelfTalkForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 max-w-md w-full">
              <h2 className="text-white font-bold text-xl mb-4">新しいセルフトーク</h2>
              <div className="space-y-4">
                <textarea
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 resize-none"
                  placeholder="ポジティブなセルフトークメッセージを入力してください"
                  id="newSelfTalk"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSelfTalkForm(false)}
                    className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.getElementById('newSelfTalk');
                      if (textarea.value.trim()) {
                        addSelfTalkMessage(textarea.value);
                        textarea.value = '';
                      }
                      setShowSelfTalkForm(false);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}