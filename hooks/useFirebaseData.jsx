import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useFirebaseData = (userId) => {
  const [points, setPoints] = useState({});
  const [todayDone, setTodayDone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 初回読み込み中フラグ
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

  // LocalStorageのデータをクリア
  const clearLocalStorageData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("habitPoints");
      localStorage.removeItem("habitCompletion");
      localStorage.removeItem("habitStartDate");
      localStorage.removeItem("habitRewardSetting");
      localStorage.removeItem("habitGoals");
      localStorage.removeItem("habitSelfTalk");
      localStorage.removeItem("habitOneTimeTasks");
      console.log('🧹 LocalStorage data cleared - using Firestore only');
    }
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
        console.log('📖 Loading existing data from Firestore');
        console.log('📖 Loaded points:', data.points);
        console.log('📖 Points keys count:', Object.keys(data.points || {}).length);
        console.log('Today\'s completion data:', data.completionData);
        
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
        console.log('🔍 Checking completion data:', {
          hasCompletionData: !!data.completionData,
          savedDate: data.completionData?.date,
          todayDate: today,
          dateMatch: data.completionData?.date === today,
          completedTasks: data.completionData?.completed
        });
        
        if (data.completionData && data.completionData.date === today) {
          const completedTasks = data.completionData.completed || [];
          setTodayDone(completedTasks);
          console.log('✅ Today\'s completed tasks loaded:', completedTasks);
        } else {
          setTodayDone([]);
          console.log('📅 No completion data for today, starting fresh');
        }
      } else {
        console.log('🆕 Creating new user data');
        // 新規ユーザーの場合、初期データを作成（pointsは除外）
        const initialData = {
          oneTimeTasks: [],
          startDate: today,
          rewardSetting: "100ptでラーメンを食べてOK",
          goals: DEFAULT_GOALS,
          selfTalkMessages: DEFAULT_SELF_TALK,
          completionData: { date: today, completed: [] }
        };
        
        await setDoc(userDocRef, initialData);
        
        setPoints({}); // ローカル状態は空で初期化
        setOneTimeTasks([]);
        setStartDate(today);
        setRewardSetting("100ptでラーメンを食べてOK");
        setGoals(DEFAULT_GOALS);
        setSelfTalkMessages(DEFAULT_SELF_TALK);
        setTodayDone([]);
      }
      
      // Firestoreを使用する場合、LocalStorageをクリア
      clearLocalStorageData();
      
      setIsLoaded(true);
      setIsInitialLoad(false); // 初回読み込み完了
    } catch (error) {
      console.error('❌ Error loading data from Firestore:', error);
      
      // Firestoreエラーの場合はLocalStorageにフォールバック
      console.warn('📱 Firestore access failed, falling back to localStorage');
      loadDataFromLocalStorage();
      return;
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
      console.log(`✅ Successfully saved ${field} to Firestore`);
    } catch (error) {
      console.error(`❌ Error saving ${field} to Firestore:`, error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        userId: userId,
        field: field,
        valueType: typeof value,
        value: field === 'completionData' ? value : '...'
      });
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    if (userId && typeof db !== 'undefined' && db) {
      console.log('🔥 Using Firestore for data storage');
      loadDataFromFirestore();
    } else {
      console.log('📱 Using localStorage fallback');
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
      
      console.log('🔍 LocalStorage completion check:', {
        hasStoredCompletion: !!storedCompletion,
        storedDate: storedCompletion?.date,
        todayDate: today,
        dateMatch: storedCompletion?.date === today,
        completedTasks: storedCompletion?.completed
      });
      
      if (storedCompletion && storedCompletion.date === today) {
        const completedTasks = storedCompletion.completed || [];
        setTodayDone(completedTasks);
        console.log('✅ LocalStorage completed tasks loaded:', completedTasks);
      } else {
        setTodayDone([]);
        console.log('📅 No LocalStorage completion data for today, starting fresh');
      }
      
      setIsLoaded(true);
      setIsInitialLoad(false); // 初回読み込み完了
    }
  };

  // データ保存のuseEffect
  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      console.log('💾 Attempting to save points:', points);
      console.log('💾 Points object keys:', Object.keys(points));
      
      // 空のオブジェクトは保存しない + 最小ポイント数チェック
      const pointsCount = Object.keys(points).length;
      const totalPoints = Object.values(points).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
      
      if (pointsCount > 0 && totalPoints > 0) {
        console.log(`💾 Saving valid points (${pointsCount} items, ${totalPoints} total) to Firestore`);
        saveDataToFirestore('points', points);
      } else {
        console.log(`⏭️ Skipping invalid points (${pointsCount} items, ${totalPoints} total)`);
      }
    }
  }, [points, isLoaded, isInitialLoad, userId]);

  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      const today = getTodayString();
      const completionData = { date: today, completed: todayDone };
      console.log('💾 Saving completion data:', completionData);
      saveDataToFirestore('completionData', completionData);
    }
  }, [todayDone, isLoaded, isInitialLoad, userId]);

  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      saveDataToFirestore('rewardSetting', rewardSetting);
    }
  }, [rewardSetting, isLoaded, isInitialLoad, userId]);

  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      saveDataToFirestore('goals', goals);
    }
  }, [goals, isLoaded, isInitialLoad, userId]);

  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      saveDataToFirestore('selfTalkMessages', selfTalkMessages);
    }
  }, [selfTalkMessages, isLoaded, isInitialLoad, userId]);

  useEffect(() => {
    if (isLoaded && !isInitialLoad && userId) { // Firestoreのみ保存
      saveDataToFirestore('oneTimeTasks', oneTimeTasks);
    }
  }, [oneTimeTasks, isLoaded, isInitialLoad, userId]);

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