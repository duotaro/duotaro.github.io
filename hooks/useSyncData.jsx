import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useSyncData = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  // LocalStorageからFirestoreへ同期
  const syncToFirestore = async (userId) => {
    if (!userId || !db) {
      setSyncStatus('Firebase認証が必要です');
      return false;
    }

    setIsSyncing(true);
    setSyncStatus('LocalStorageからFirestoreに同期中...');

    try {
      // LocalStorageからデータを読み込み
      const storedPoints = JSON.parse(localStorage.getItem("habitPoints") || "{}");
      const storedCompletion = JSON.parse(localStorage.getItem("habitCompletion") || "{}");
      const storedStartDate = localStorage.getItem("habitStartDate");
      const storedRewardSetting = localStorage.getItem("habitRewardSetting");
      const storedGoals = JSON.parse(localStorage.getItem("habitGoals") || "null");
      const storedSelfTalk = JSON.parse(localStorage.getItem("habitSelfTalk") || "null");
      const storedOneTimeTasks = JSON.parse(localStorage.getItem("habitOneTimeTasks") || "[]");
      const today = getTodayString();

      // Firestoreに同期データを保存
      const syncData = {
        points: storedPoints,
        oneTimeTasks: storedOneTimeTasks,
        startDate: storedStartDate || today,
        rewardSetting: storedRewardSetting || "100ptでラーメンを食べてOK",
        goals: storedGoals || DEFAULT_GOALS,
        selfTalkMessages: storedSelfTalk || DEFAULT_SELF_TALK,
        completionData: storedCompletion.date === today ? storedCompletion : { date: today, completed: [] },
        lastSyncedAt: new Date().toISOString(),
        syncDirection: 'localStorage_to_firestore'
      };

      const userDocRef = doc(db, 'habitData', userId);
      await setDoc(userDocRef, syncData);

      setSyncStatus('✅ LocalStorageからFirestoreへの同期が完了しました');
      setIsSyncing(false);
      
      return true;
    } catch (error) {
      console.error('Sync to Firestore error:', error);
      setSyncStatus(`❌ 同期エラー: ${error.message}`);
      setIsSyncing(false);
      return false;
    }
  };

  // FirestoreからLocalStorageへ同期
  const syncFromFirestore = async (userId) => {
    if (!userId || !db) {
      setSyncStatus('Firebase認証が必要です');
      return false;
    }

    setIsSyncing(true);
    setSyncStatus('Firestoreからデータを取得中...');

    try {
      const userDocRef = doc(db, 'habitData', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setSyncStatus('Firestoreにデータがありません');
        setIsSyncing(false);
        return false;
      }

      const data = userDoc.data();
      setSyncStatus('LocalStorageにデータを保存中...');

      // LocalStorageに同期データを保存
      if (data.points) {
        localStorage.setItem("habitPoints", JSON.stringify(data.points));
      }
      if (data.completionData) {
        localStorage.setItem("habitCompletion", JSON.stringify(data.completionData));
      }
      if (data.startDate) {
        localStorage.setItem("habitStartDate", data.startDate);
      }
      if (data.rewardSetting) {
        localStorage.setItem("habitRewardSetting", data.rewardSetting);
      }
      if (data.goals) {
        localStorage.setItem("habitGoals", JSON.stringify(data.goals));
      }
      if (data.selfTalkMessages) {
        localStorage.setItem("habitSelfTalk", JSON.stringify(data.selfTalkMessages));
      }
      if (data.oneTimeTasks) {
        localStorage.setItem("habitOneTimeTasks", JSON.stringify(data.oneTimeTasks));
      }

      setSyncStatus('✅ FirestoreからLocalStorageへの同期が完了しました。ページをリロードしてください。');
      setIsSyncing(false);
      
      return true;
    } catch (error) {
      console.error('Sync from Firestore error:', error);
      setSyncStatus(`❌ 同期エラー: ${error.message}`);
      setIsSyncing(false);
      return false;
    }
  };

  // LocalStorageデータの確認
  const checkLocalStorageData = () => {
    const data = {
      points: JSON.parse(localStorage.getItem("habitPoints") || "{}"),
      completion: JSON.parse(localStorage.getItem("habitCompletion") || "{}"),
      startDate: localStorage.getItem("habitStartDate"),
      rewardSetting: localStorage.getItem("habitRewardSetting"),
      goals: JSON.parse(localStorage.getItem("habitGoals") || "null"),
      selfTalk: JSON.parse(localStorage.getItem("habitSelfTalk") || "null"),
      oneTimeTasks: JSON.parse(localStorage.getItem("habitOneTimeTasks") || "[]")
    };

    // データが存在するかチェック
    const hasData = Object.values(data).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return value !== null && value !== undefined && value !== '';
    });

    return { hasData, data };
  };

  // Firestoreデータの確認
  const checkFirestoreData = async (userId) => {
    if (!userId || !db) {
      return { hasData: false, data: null };
    }

    try {
      const userDocRef = doc(db, 'habitData', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return { hasData: false, data: null };
      }

      const data = userDoc.data();
      const hasData = data && Object.keys(data).length > 0;

      return { hasData, data };
    } catch (error) {
      console.error('Error checking Firestore data:', error);
      return { hasData: false, data: null, error: error.message };
    }
  };

  return {
    isSyncing,
    syncStatus,
    setSyncStatus,
    syncToFirestore,
    syncFromFirestore,
    checkLocalStorageData,
    checkFirestoreData
  };
};