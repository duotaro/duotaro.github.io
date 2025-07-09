// タスク定義
export const TASKS = [
  // 投資
  { 
    id: "orderflow-study", 
    category: "investment",
    categoryLabel: "🪙 投資",
    label: "OFトレード学習", 
    points: 5,
    days: [1, 3, 5], // 月、水、金
    time: "13時から"
  },
  { 
    id: "defi-review", 
    category: "investment",
    categoryLabel: "🪙 投資",
    label: "DeFi運用見直し", 
    points: 5,
    days: [1], // 月
    time: "OFトレード学習後"
  },
  // コンテンツ作成
  { 
    id: "note-writing", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "OF学習noteまとめ", 
    points: 5,
    days: [1], // 月
    time: "DeFi運用見直し後"
  },
  { 
    id: "sns-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "[OF]note要点をSNSに投稿", 
    points: 3,
    days: [3], // 水
    time: "Orderflow学習後"
  },
  { 
    id: "bukei-onepoint-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "一言兵法 投稿", 
    points: 3,
    days: [1, 2, 3, 4, 5, 6, 7], // 毎日
    time: "保育園に送迎して帰宅したら(8-10時)"
  },
  { 
    id: "bukei-news-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "ニュース兵法読み解き 投稿", 
    points: 3,
    days: [1, 2, 3, 4, 5, 6, 7], // 毎日
    time: "12時までのタスクが終わったら"
  },
  { 
    id: "bukei-news-post", 
    category: "content",
    categoryLabel: "✍️ コンテンツ作成",
    label: "ブログ関連 投稿", 
    points: 3,
    days: [1, 2, 3, 4, 5, 6, 7], // 毎日
    time: "子供と寝る前(予約投稿でもOK)"
  },
  // 学習
  { 
    id: "future-tech-study", 
    category: "learning",
    categoryLabel: "🧠 学習（先端技術）",
    label: "先端技術に関する学習", 
    points: 5,
    days: [2, 4], // 火曜・木曜
    time: "SNSに投稿後"
  },
  // トレーニング（ポモドーロ）
  { 
    id: "pomodoro-pushups", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "プッシュアップ（ポモドーロ）", 
    points: 2,
    days: [1, 3], // 月水
    time: "各25分作業後の5分休憩中"
  },
  { 
    id: "pomodoro-squats", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "スクワット（ポモドーロ）", 
    points: 1,
    days: [1, 2, 3, 4], // 月火水木
    time: "各25分作業後の5分休憩中"
  },
  { 
    id: "pomodoro-abs", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "腹筋（ポモドーロ）", 
    points: 1,
    days: [1, 2, 3, 4, 5], // 平日毎日
    time: "各25分作業後の5分休憩中"
  },
  { 
    id: "pomodoro-lower-stretch", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "下半身ストレッチ（ポモドーロ）", 
    points: 1,
    days: [1, 2, 3, 4, 5], // 平日毎日
    time: "各25分作業後の5分休憩中"
  },
  // トレーニング（夜）
  { 
    id: "night-pushups", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "プッシュアップ（夜）", 
    points: 2,
    days: [6], // 土
    time: "各25分作業後の5分休憩中"
  },
  { 
    id: "dumbbell-rowing-phase1-sat", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルローイング（2 x 12-15）", 
    points: 6,
    days: [6], // 土
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-curl-phase1-sat", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルカール（2 x 12-15）", 
    points: 6,
    days: [6], // 土
    time: "子供が寝たらすぐ"
  },
  { 
    id: "night-hiit", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "HIIT（夜）", 
    points: 2,
    days: [2, 4], // 火木
    time: "子供が寝たらすぐ"
  },
  { 
    id: "night-abs", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "腹筋（夜）", 
    points: 1,
    days: [1, 2, 3, 4, 5, 6], // 日曜以外
    time: "子供が寝たらすぐ"
  },
  { 
    id: "night-upper-stretch", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "肩・背中ストレッチ（夜）", 
    points: 1,
    days: [1, 2, 3, 4, 5, 6, 7], // 毎日
    time: "子供が寝たらすぐ"
  },
  // ダンベル導入期追加メニュー
  { 
    id: "dumbbell-press-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルプレス（2 x 12-15）", 
    points: 6,
    days: [1], // 月曜日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-french-press-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルフレンチプレス（2 x 12-15）", 
    points: 6,
    days: [1], // 月曜日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-rowing-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルローイング（2 x 12-15）", 
    points: 6,
    days: [3], // 水曜日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-curl-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルカール（2 x 12-15）", 
    points: 6,
    days: [3], // 水曜日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-squat-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルスクワット（2 x 12-15）", 
    points: 6,
    days: [5], // 金曜日
    time: "子供が寝たらすぐ"
  },
  { 
    id: "dumbbell-shoulder-press-phase1", 
    category: "training",
    categoryLabel: "🏋️‍♂️ トレーニング",
    label: "ダンベルショルダープレス（2 x 12-15）", 
    points: 6,
    days: [5], // 金曜日
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
  // 瞑想
  { 
    id: "mindfulness", 
    category: "mindfulness",
    categoryLabel: "👁️ マインドフルネス",
    label: "瞑想", 
    points: 3,
    days: [0, 1, 2, 3, 4, 5, 6], // 毎日
    time: "寝る前"
  },
  // レビュー
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

// カテゴリーカラー
export const CATEGORY_COLORS = {
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

// 認証設定
export const CORRECT_PASSWORD = "1229";

// レビューテキストテンプレート
export const REVIEW_TEXT = `・続いたこと
・サボった理由
・修正ポイント
・翌週にやりたい改善`;