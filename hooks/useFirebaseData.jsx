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
    if (!userId || typeof db === 'undefined' || !db) {
      console.log('⚠️ loadDataFromFirestore: Missing userId or db');
      return;
    }

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
      
      // Firestoreエラーの場合はLocalStorageにフォールバック
      console.warn('Firestore access failed, falling back to localStorage:', error);
      loadDataFromLocalStorage();
      return;
      
      setIsLoaded(true);
    }
  };

  // Firestoreにデータを保存
  const saveDataToFirestore = async (field, value) => {
    if (!userId || !isLoaded || typeof db === 'undefined' || !db) {
      console.log('⚠️ saveDataToFirestore: Missing userId, not loaded, or db unavailable');
      return;
    }
    
    try {
      const userDocRef = doc(db, 'habitData', userId);
      await updateDoc(userDocRef, { [field]: value });
    } catch (error) {
      console.error(`Error saving ${field} to Firestore:`, error);
      
      // Firestoreエラーをログに記録
      console.warn(`Failed to save ${field} to Firestore:`, error);
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    console.log('🔍 useFirebaseData Debug:');
    console.log('- userId:', userId);
    console.log('- db available:', !!db);
    console.log('- auth available:', typeof auth !== 'undefined' && !!auth);
    console.log('- Firebase initialized:', !!db && typeof auth !== 'undefined' && !!auth);
    
    if (userId && typeof db !== 'undefined' && db) {
      console.log('🔥 Using Firestore for data storage');
      loadDataFromFirestore();
    } else {
      // userIdがない場合（Firebaseが利用できない場合）は元のlocalStorage方式を使用
      console.log('📱 useFirebaseData: No userId or db, falling back to localStorage');
      console.log('📱 Reason: Firebase not available or user not authenticated');
      loadDataFromLocalStorage();
    }
  }, [userId]);

  // LocalStorageからのデータ読み込み（フォールバック）
  const loadDataFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedPoints = JSON.parse(localStorage.getItem("habitPoints") || "{}");
      const storedCompletion = JSON.parse(localStorage.getItem("habitCompletion") || "{}");
      const storedStartDate = localStorage.getItem("habitStartDate");
      const storedRewardSetting = localStorage.getItem("habitRewardSetting");
      const storedGoals = JSON.parse(localStorage.getItem("habitGoals") || "null");
      const storedSelfTalk = JSON.parse(localStorage.getItem("habitSelfTalk") || "null");
      const storedOneTimeTasks = JSON.parse(localStorage.getItem("habitOneTimeTasks") || "[]");
      const today = getTodayString();
      
      setPoints(storedPoints);
      setOneTimeTasks(storedOneTimeTasks);
      
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
      
      setIsLoaded(true);
    }
  };

  // データ保存のuseEffect
  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        saveDataToFirestore('points', points);
      } else {
        localStorage.setItem("habitPoints", JSON.stringify(points));
      }
    }
  }, [points, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded) {
      const today = getTodayString();
      const completionData = { date: today, completed: todayDone };
      if (userId) {
        saveDataToFirestore('completionData', completionData);
      } else {
        localStorage.setItem("habitCompletion", JSON.stringify(completionData));
      }
    }
  }, [todayDone, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        saveDataToFirestore('rewardSetting', rewardSetting);
      } else {
        localStorage.setItem("habitRewardSetting", rewardSetting);
      }
    }
  }, [rewardSetting, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        saveDataToFirestore('goals', goals);
      } else {
        localStorage.setItem("habitGoals", JSON.stringify(goals));
      }
    }
  }, [goals, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        saveDataToFirestore('selfTalkMessages', selfTalkMessages);
      } else {
        localStorage.setItem("habitSelfTalk", JSON.stringify(selfTalkMessages));
      }
    }
  }, [selfTalkMessages, isLoaded, userId]);

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        saveDataToFirestore('oneTimeTasks', oneTimeTasks);
      } else {
        localStorage.setItem("habitOneTimeTasks", JSON.stringify(oneTimeTasks));
      }
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