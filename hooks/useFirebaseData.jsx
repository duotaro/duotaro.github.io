import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useFirebaseData = (userId) => {
  const [points, setPoints] = useState({});
  const [todayDone, setTodayDone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [rewardSetting, setRewardSetting] = useState("100ptでラーメンを食べてOK");
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [selfTalkMessages, setSelfTalkMessages] = useState(DEFAULT_SELF_TALK);
  const [oneTimeTasks, setOneTimeTasks] = useState([]);

  // 今日の日付と曜日を取得
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

  // Firestoreからデータを読み込み
  const loadDataFromFirestore = async () => {
    if (!userId || !db) return;

    try {
      const userDocRef = doc(db, 'habitData', userId);
      const userDoc = await getDoc(userDocRef);
      const today = getTodayString();

      if (userDoc.exists()) {
        const data = userDoc.data();
        
        setPoints(data.points || {});
        setOneTimeTasks(data.oneTimeTasks || []);
        setRewardSetting(data.rewardSetting || "100ptでラーメンを食べてOK");
        setGoals(data.goals || DEFAULT_GOALS);
        setSelfTalkMessages(data.selfTalkMessages || DEFAULT_SELF_TALK);
        
        if (data.startDate) {
          setStartDate(data.startDate);
        } else {
          setStartDate(today);
          await updateDoc(userDocRef, { startDate: today });
        }
        
        // 今日の完了状況をチェック
        if (data.completionData && data.completionData.date === today) {
          setTodayDone(data.completionData.completed || []);
        }
      } else {
        // 新規ユーザーの場合、初期データを作成
        const initialData = {
          points: {},
          oneTimeTasks: [],
          startDate: today,
          rewardSetting: "100ptでラーメンを食べてOK",
          goals: DEFAULT_GOALS,
          selfTalkMessages: DEFAULT_SELF_TALK,
          completionData: { date: today, completed: [] }
        };
        
        await setDoc(userDocRef, initialData);
        
        setPoints({});
        setOneTimeTasks([]);
        setStartDate(today);
        setRewardSetting("100ptでラーメンを食べてOK");
        setGoals(DEFAULT_GOALS);
        setSelfTalkMessages(DEFAULT_SELF_TALK);
        setTodayDone([]);
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading data from Firestore:', error);
      setIsLoaded(true);
    }
  };

  // Firestoreにデータを保存
  const saveDataToFirestore = async (field, value) => {
    if (!userId || !isLoaded || !db) return;
    
    try {
      const userDocRef = doc(db, 'habitData', userId);
      await updateDoc(userDocRef, { [field]: value });
    } catch (error) {
      console.error(`Error saving ${field} to Firestore:`, error);
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    if (userId) {
      loadDataFromFirestore();
    }
  }, [userId]);

  // データ保存のuseEffect
  useEffect(() => {
    if (isLoaded && userId) {
      saveDataToFirestore('points', points);
    }
  }, [points, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      const today = getTodayString();
      const completionData = { date: today, completed: todayDone };
      saveDataToFirestore('completionData', completionData);
    }
  }, [todayDone, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      saveDataToFirestore('rewardSetting', rewardSetting);
    }
  }, [rewardSetting, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      saveDataToFirestore('goals', goals);
    }
  }, [goals, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      saveDataToFirestore('selfTalkMessages', selfTalkMessages);
    }
  }, [selfTalkMessages, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      saveDataToFirestore('oneTimeTasks', oneTimeTasks);
    }
  }, [oneTimeTasks, isLoaded, userId]);

  return {
    // State
    points,
    setPoints,
    todayDone,
    setTodayDone,
    isLoaded,
    startDate,
    rewardSetting,
    setRewardSetting,
    goals,
    setGoals,
    selfTalkMessages,
    setSelfTalkMessages,
    oneTimeTasks,
    setOneTimeTasks,
    // Helper functions
    getTodayString,
    getDayCount
  };
};