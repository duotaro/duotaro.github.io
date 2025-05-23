"use client";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { key: "investment", label: "投資学習", points: 2 },
  { key: "content", label: "コンテンツ作成", points: 1 },
  { key: "learning", label: "最新技術キャッチアップ", points: 1 },
  { key: "training", label: "トレーニング", points: 2 }
];

export default function Home() {
  const [points, setPoints] = useState({});
  const [todayDone, setTodayDone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState(null);

  // 今日の日付を取得（YYYY-MM-DD形式）
  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
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

  // コンポーネントマウント後にlocalStorageから読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPoints = localStorage.getItem("habitPoints");
      const storedCompletion = localStorage.getItem("habitCompletion");
      const storedStartDate = localStorage.getItem("habitStartDate");
      const today = getTodayString();
      
      if (storedPoints) {
        setPoints(JSON.parse(storedPoints));
      }
      
      // 開始日の設定（初回のみ）
      if (storedStartDate) {
        setStartDate(storedStartDate);
      } else {
        localStorage.setItem("habitStartDate", today);
        setStartDate(today);
      }
      
      // 今日完了したタスクを復元
      if (storedCompletion) {
        const completionData = JSON.parse(storedCompletion);
        if (completionData.date === today) {
          setTodayDone(completionData.completed || []);
        }
        // 日付が異なる場合は新しい日なのでリセット
      }
      
      setIsLoaded(true);
    }
  }, []);

  // pointsが変更されたらlocalStorageに保存
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem("habitPoints", JSON.stringify(points));
    }
  }, [points, isLoaded]);

  // todayDoneが変更されたら完了状況を保存
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const today = getTodayString();
      const completionData = {
        date: today,
        completed: todayDone
      };
      localStorage.setItem("habitCompletion", JSON.stringify(completionData));
    }
  }, [todayDone, isLoaded]);

  const handleComplete = (key) => {
    if (todayDone.includes(key)) return;
    const category = CATEGORIES.find(c => c.key === key);
    const pointsToAdd = category ? category.points : 1;
    setPoints((prev) => ({ ...prev, [key]: (prev[key] || 0) + pointsToAdd }));
    setTodayDone((prev) => [...prev, key]);
  };

  const totalPoints = Object.values(points).reduce((sum, v) => sum + v, 0);
  
  // 今日の合計ポイント計算
  const todayPoints = todayDone.reduce((sum, key) => {
    const category = CATEGORIES.find(c => c.key === key);
    return sum + (category ? category.points : 1);
  }, 0);

  const dayCount = getDayCount();
  
  // SNS用テキスト生成
  const generateShareText = () => {
    const completedTasks = todayDone.map(key => {
      const category = CATEGORIES.find(c => c.key === key);
      return `✅ ${category.label}（+${category.points}pt）`;
    });
    
    let shareText = `#習慣ログ Day${dayCount}\n`;
    
    if (completedTasks.length > 0) {
      shareText += completedTasks.join('\n') + '\n';
    }
    
    shareText += `🎯 今日の合計：${todayPoints}pt\n`;
    shareText += `📈 累計ポイント：${totalPoints}pt\n`;
    shareText += `🪙100ptでラーメンを食べて良いこととする✨\n`;
    shareText += `#自分強化 #習慣化 #未来逆算`;
    
    return shareText;
  };

  const shareText = generateShareText();

  // ローディング中は簡単な表示
  if (!isLoaded) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">習慣ポイントアプリ</h1>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">習慣ポイントアプリ</h1>
      <div className="grid grid-cols-1 gap-4">
        {CATEGORIES.map(({ key, label, points }) => (
          <button
            key={key}
            onClick={() => handleComplete(key)}
            disabled={todayDone.includes(key)}
            className={`p-4 rounded-xl text-white font-semibold shadow-md transition ${
              todayDone.includes(key)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {label} を完了（+{points}pt）
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">✨ ポイント状況</h2>
        <p className="text-lg">累計: {totalPoints}pt</p>
        <p className="text-lg">今日: {todayPoints}pt</p>
        <p className="text-sm text-gray-600 mt-2">
          Day {dayCount} | 完了: {todayDone.length}/4 カテゴリ
        </p>
      </div>

      <div className="mt-6 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">📤 SNS用テキスト</h2>
        <textarea
          readOnly
          value={shareText}
          className="w-full p-2 border rounded h-32 text-sm"
        />
      </div>
    </div>
  );
}