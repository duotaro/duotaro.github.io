"use client";
import { useState, useEffect } from "react";

// Import constants
import { TASKS, CATEGORY_COLORS } from '../const/habitConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

// Import hooks
import { useFirebaseData } from '../hooks/useFirebaseData';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useTaskLogic } from '../hooks/useTaskLogic';
import { useUserAuth } from '../hooks/useUserAuth';

// Import components
import LoadingScreen from '../components/habit/LoadingScreen';
import AuthLogin from '../components/habit/AuthLogin';
import DataMigrationModal from '../components/habit/DataMigrationModal';
import TaskProgressSummary from '../components/habit/TaskProgressSummary';
import SelfTalkBanner from '../components/habit/SelfTalkBanner';
import TaskItem from '../components/habit/TaskItem';
import OneTimeTaskInput from '../components/habit/OneTimeTaskInput';
import OneTimeTaskItem from '../components/habit/OneTimeTaskItem';
import GoalCard from '../components/habit/GoalCard';
import GoalEditModal from '../components/habit/GoalEditModal';
import SelfTalkSection from '../components/habit/SelfTalkSection';
import SelfTalkModal from '../components/habit/SelfTalkModal';
import TemplateSection from '../components/habit/TemplateSection';
import BackupRestoreSection from '../components/habit/BackupRestoreSection';

export default function Home() {
  // Hook imports
  const auth = useFirebaseAuth();
  
  // 実際に使用するユーザーIDを決定（Firebaseユーザーのみ）
  const effectiveUserId = auth.user?.uid;
  
  // ユーザー認証チェック（制限撤廃済み）
  const userAuth = useUserAuth(effectiveUserId, false, auth.user?.uid);
  
  const habitData = useFirebaseData(effectiveUserId);
  const taskLogic = useTaskLogic(
    habitData.todayDone, 
    habitData.setPoints, 
    habitData.setTodayDone, 
    habitData.oneTimeTasks, 
    habitData.setOneTimeTasks
  );

  // Local state
  const [currentView, setCurrentView] = useState("tasks");
  const [isEditingReward, setIsEditingReward] = useState(false);
  const [showMigration, setShowMigration] = useState(false);
  const [migrationCompleted, setMigrationCompleted] = useState(false);
  const [tempRewardText, setTempRewardText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentSelfTalk, setCurrentSelfTalk] = useState("");
  const [goalFormData, setGoalFormData] = useState(null); 
  const [expandedSection, setExpandedSection] = useState({ goalId: null, type: null });
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSelfTalkForm, setShowSelfTalkForm] = useState(false);

  // ランダムセルフトークを取得
  const getRandomSelfTalk = () => {
    return habitData.selfTalkMessages[Math.floor(Math.random() * habitData.selfTalkMessages.length)];
  };

  // 初期セルフトーク設定
  useEffect(() => {
    if (habitData.isLoaded) {
      setCurrentSelfTalk(getRandomSelfTalk());
    }
  }, [habitData.isLoaded]);

  // 目標の進捗更新
  const updateGoalProgress = (goalId, newProgress) => {
    habitData.setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.max(0, Math.min(100, newProgress)) }
        : goal
    ));
  };

  // セルフトークメッセージ追加
  const addSelfTalkMessage = (message) => {
    if (message.trim() && !habitData.selfTalkMessages.includes(message.trim())) {
      habitData.setSelfTalkMessages(prev => [...prev, message.trim()]);
    }
  };

  // セルフトークメッセージ削除
  const removeSelfTalkMessage = (index) => {
    habitData.setSelfTalkMessages(prev => prev.filter((_, i) => i !== index));
  };

  // OKR/WOOPの表示を切り替える関数
  const toggleSection = (goalId, type) => {
    setExpandedSection(prev => {
      if (prev.goalId === goalId && prev.type === type) {
        return { goalId: null, type: null };
      }
      return { goalId, type };
    });
  };

  // 編集フォームの入力値を処理する関数
  const handleGoalFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
        const [section, field] = name.split('.');
        setGoalFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    } else {
        setGoalFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }
  };

  // 編集内容を保存する関数
  const handleUpdateGoal = (e) => {
      e.preventDefault();
      habitData.setGoals(prevGoals =>
          prevGoals.map(goal => (goal.id === goalFormData.id ? goalFormData : goal))
      );
      setEditingGoal(null);
  };

  // 編集時のフォームデータ設定
  useEffect(() => {
    if (editingGoal) {
      setGoalFormData(JSON.parse(JSON.stringify(editingGoal)));
    } else {
      setGoalFormData(null);
    }
  }, [editingGoal]);

  // ご褒美設定関数
  const startEditingReward = () => {
    setTempRewardText(habitData.rewardSetting);
    setIsEditingReward(true);
  };

  const saveRewardSetting = () => {
    habitData.setRewardSetting(tempRewardText);
    setIsEditingReward(false);
  };

  const cancelEditingReward = () => {
    setTempRewardText("");
    setIsEditingReward(false);
  };

  // Computed values
  const totalPoints = Object.values(habitData.points).reduce((sum, v) => sum + v, 0);
  const todayTasks = taskLogic.getTodayTasks();
  const completedTodayTasks = taskLogic.getCompletedTodayTasks();
  const addableTasks = taskLogic.getAddableTasks();
  
  const todayPoints = completedTodayTasks.reduce((sum, task) => sum + task.points, 0);
  
  const completionRate = todayTasks.length > 0 
    ? Math.round((todayTasks.filter(task => habitData.todayDone.includes(task.id)).length / todayTasks.length) * 100)
    : 0;

  const dayCount = habitData.getDayCount();

  // SNS用テキスト生成
  const generateShareText = () => {
    const completedTasksText = completedTodayTasks.map(task => 
      `✅ ${task.label}`
    );
    
    let shareText = `Day${dayCount}\n`;
    
    if (completedTasksText.length > 0) {
      shareText += completedTasksText.join('\n') + '\n';
    }
    
    shareText += `📈 累計ポイント：${totalPoints}pt\n`;
    shareText += `💪 "${currentSelfTalk}"\n`;
    shareText += `#日々コツコツ #習慣化 #目標達成 #習慣ログ `;
    
    return shareText;
  };

  const shareText = generateShareText();

  // 移行チェックのuseEffect
  useEffect(() => {
    if (auth.isAuthenticated && effectiveUserId && habitData.isLoaded && !migrationCompleted) {
      const migrationKey = `migration-completed-${effectiveUserId}`;
      const completed = localStorage.getItem(migrationKey);
      
      if (!completed) {
        setShowMigration(true);
      } else {
        setMigrationCompleted(true);
      }
    }
  }, [auth.isAuthenticated, effectiveUserId, habitData.isLoaded, migrationCompleted]);

  const handleMigrationComplete = () => {
    if (effectiveUserId) {
      const migrationKey = `migration-completed-${effectiveUserId}`;
      localStorage.setItem(migrationKey, 'true');
    }
    setShowMigration(false);
    setMigrationCompleted(true);
    // データを再読み込み
    window.location.reload();
  };

  const handleMigrationSkip = () => {
    if (effectiveUserId) {
      const migrationKey = `migration-completed-${effectiveUserId}`;
      localStorage.setItem(migrationKey, 'true');
    }
    setShowMigration(false);
    setMigrationCompleted(true);
  };

  // 緊急復元機能
  const handleRestorePoints = async () => {
    if (!effectiveUserId) {
      alert('ユーザーIDが見つかりません');
      return;
    }

    const confirmed = window.confirm(
      '本番環境のポイントデータを復元します。現在のポイントデータは上書きされます。続行しますか？'
    );

    if (!confirmed) return;

    try {
      const restorePointsData = {
        "daily-reflection": 19,
        "future-tech-study": 17,
        "meal-record": 22,
        "mindfulness": 24,
        "night-exercise": 63,
        "note-writing": 3,
        "one-time-1750259184966-0": 5,
        "one-time-1750405853696-0": 5,
        "one-time-1750514399046-0": 3,
        "one-time-1750811849092-0": 3,
        "one-time-1750814295995-0": 3,
        "one-time-1750814460044-0": 3,
        "one-time-1750816979074-0": 3,
        "orderflow-study": 38,
        "pomodoro-abs": 1,
        "pomodoro-exercise": 38,
        "pomodoro-lower-stretch": 1,
        "pomodoro-pushups": 2,
        "pomodoro-squats": 1,
        "self-talk": 42,
        "sns-post": 9,
        "training": 2,
        "vision-meditation": 30,
        "weekly-reflection": 10,
        "weight-record": 21
      };

      // Firestoreに直接書き込み
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      const userDocRef = doc(db, 'habitData', effectiveUserId);
      await updateDoc(userDocRef, { points: restorePointsData });
      
      // ローカル状態も更新
      habitData.setPoints(restorePointsData);
      
      alert('✅ ポイントデータが正常に復元されました！');
      console.log('復元されたデータ:', restorePointsData);
      
    } catch (error) {
      console.error('復元エラー:', error);
      alert('❌ 復元に失敗しました: ' + error.message);
    }
  };

  if (auth.loading || !habitData.isLoaded || userAuth.isCheckingAuth) {
    return <LoadingScreen />;
  }

  if (!auth.isAuthenticated) {
    return <AuthLogin auth={auth} />;
  }

  // アクセス制限を撤廃したため、この条件は不要

  if (showMigration) {
    return (
      <DataMigrationModal
        userId={effectiveUserId}
        onComplete={handleMigrationComplete}
        onSkip={handleMigrationSkip}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="text-center mb-6 pt-4 relative">
          <button
            onClick={auth.handleLogout}
            className="absolute top-0 right-0 text-purple-200 hover:text-white transition-colors text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:bg-white/20"
          >
            🚪 ログアウト
          </button>
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
            { key: "selftalk", label: "💪 マインド", icon: "💪" },
            { key: "templates", label: "📝 メモ", icon: "📝"},
            { key: "settings", label: "⚙️ 設定", icon: "⚙️"}
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
            <div className="lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="lg:col-span-2">
                <TaskProgressSummary 
                  totalPoints={totalPoints}
                  todayPoints={todayPoints}
                  completionRate={completionRate}
                  todayTasks={todayTasks}
                  todayDone={habitData.todayDone}
                />

                <SelfTalkBanner 
                  currentSelfTalk={currentSelfTalk}
                  onRefresh={() => setCurrentSelfTalk(getRandomSelfTalk())}
                />
              </div>

              <div className="lg:col-span-1">
                {/* 今日のタスク */}
                {todayTasks.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-white font-semibold mb-4 flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-2"></div>
                      今日の予定
                    </h2>
                    <div className="space-y-3">
                      {todayTasks.map((task) => {
                        const isCompleted = habitData.todayDone.includes(task.id);
                        return (
                          <TaskItem
                            key={task.id}
                            task={task}
                            isCompleted={isCompleted}
                            onComplete={taskLogic.handleComplete}
                          />
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
                          <TaskItem
                            key={task.id}
                            task={task}
                            isCompleted={false}
                            onComplete={taskLogic.handleComplete}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                {/* 単発タスクセクション */}
                <div className="mb-6">
                  <h2 className="text-white font-semibold mb-4 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-lime-400 to-green-500 rounded-full mr-2"></div>
                    単発タスク
                  </h2>
                  
                  <OneTimeTaskInput onAddTask={taskLogic.handleAddOneTimeTask} />
                  
                  <div className="space-y-3">
                    {habitData.oneTimeTasks.filter(task => !habitData.todayDone.includes(task.id)).map((task) => (
                      <OneTimeTaskItem
                        key={task.id}
                        task={task}
                        onComplete={taskLogic.handleCompleteOneTimeTask}
                        onDelete={taskLogic.handleDeleteOneTimeTask}
                      />
                    ))}
                  </div>
                </div>

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
                      {habitData.oneTimeTasks.filter(task => habitData.todayDone.includes(task.id)).map((task) => (
                        <div
                          key={task.id}
                          className="bg-green-500/10 backdrop-blur-xl rounded-xl p-3 border border-green-400/20"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-green-200 text-sm">{task.text}</span>
                            <span className="text-green-300 text-xs font-bold">+{task.points}pt</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
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
                      🪙 {habitData.rewardSetting} ✨
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
          </>
        )}

        {currentView === "goals" && (
          <div className="space-y-6">
            <div className="space-y-4">
              {habitData.goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={setEditingGoal}
                  onUpdateProgress={updateGoalProgress}
                  expandedSection={expandedSection}
                  onToggleSection={toggleSection}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === "selftalk" && (
          <SelfTalkSection
            currentSelfTalk={currentSelfTalk}
            onRefresh={() => setCurrentSelfTalk(getRandomSelfTalk())}
            selfTalkMessages={habitData.selfTalkMessages}
            onAddMessage={addSelfTalkMessage}
            onRemoveMessage={removeSelfTalkMessage}
            onShowForm={() => setShowSelfTalkForm(true)}
            dayCount={dayCount}
          />
        )}

        {currentView === "templates" && <TemplateSection />}

        {currentView === "settings" && (
          <div className="space-y-6">
            <BackupRestoreSection userId={effectiveUserId} />
            
            {/* 緊急復元セクション */}
            <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-5 border border-red-400/20 shadow-xl">
              <h2 className="text-white font-semibold mb-4 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mr-2"></div>
                緊急復元
              </h2>
              <p className="text-red-200 text-sm mb-4">
                ⚠️ 本番環境のポイントデータが失われた場合の一時的な復元機能です
              </p>
              <button
                onClick={handleRestorePoints}
                className="w-full py-3 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                🔧 ポイントデータを復元
              </button>
            </div>
            
            {/* その他の設定 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
              <h2 className="text-white font-semibold mb-4 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full mr-2"></div>
                アプリケーション情報
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-200">バージョン</span>
                  <span className="text-white">v2.0.0 (Firebase統合版)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">データ保存</span>
                  <span className="text-white">{auth.user ? 'Firebase Firestore' : 'LocalStorage'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">現在のユーザーID</span>
                  <span className="text-white text-xs">{effectiveUserId || '未認証'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">認証方式</span>
                  <span className="text-white text-xs">Firebase匿名認証</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 目標追加/編集フォーム */}
        {editingGoal && goalFormData && (
          <GoalEditModal
            goalFormData={goalFormData}
            onFormChange={handleGoalFormChange}
            onSubmit={handleUpdateGoal}
            onCancel={() => setEditingGoal(null)}
          />
        )}

        {/* セルフトーク追加フォーム */}
        {showSelfTalkForm && (
          <SelfTalkModal
            onClose={() => setShowSelfTalkForm(false)}
            onAdd={addSelfTalkMessage}
          />
        )}
      </div>
    </div>
  );
}