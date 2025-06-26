// Firestore ポイントデータ復元スクリプト
// 本番環境で実行してください

const restorePoints = {
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

console.log('復元用ポイントデータ:');
console.log(JSON.stringify(restorePoints, null, 2));

// ブラウザのコンソールで実行する場合:
// 1. 本番環境のアプリにアクセス
// 2. ブラウザのコンソールを開く
// 3. 以下のコードを実行:

/*
// Firebase imports (既にアプリで読み込まれている想定)
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

// 現在のユーザーIDを取得 (アプリから)
const currentUserId = "YOUR_USER_ID_HERE"; // 実際のUIDに置き換え

// ポイントデータを復元
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

async function restorePoints() {
  try {
    const userDocRef = doc(db, 'habitData', currentUserId);
    await updateDoc(userDocRef, { points: restorePointsData });
    console.log('✅ ポイントデータが正常に復元されました！');
    console.log('復元されたデータ:', restorePointsData);
  } catch (error) {
    console.error('❌ 復元に失敗しました:', error);
  }
}

// 実行
restorePoints();
*/