import { useState, useEffect } from 'react';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useLocalStorageData = () => {
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

  // LocalStorageにデータを保存
  const saveDataToLocalStorage = (field, value) => {
    if (typeof window !== 'undefined') {
      try {
        const key = `habit${field.charAt(0).toUpperCase() + field.slice(1).replace('Data', '')}`;
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`✅ Successfully saved ${field} to localStorage`);
      } catch (error) {
        console.error(`❌ Error saving ${field} to localStorage:`, error);
      }
    }
  };

  // 壊れたJSON文字列をクリーンアップする関数
  const cleanupCorruptedJsonString = (str) => {
    if (typeof str !== 'string') return str;
    
    // 二重エンコードされた文字列を修正
    let cleaned = str;
    
    // 先頭と末尾の不要な引用符を削除
    while (cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length > 2) {
      try {
        const unescaped = JSON.parse(cleaned);
        if (typeof unescaped === 'string') {
          cleaned = unescaped;
        } else {
          break;
        }
      } catch (error) {
        break;
      }
    }
    
    return cleaned;
  };

  // LocalStorageからのデータ読み込み
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
        // 壊れたJSON文字列をクリーンアップしてから設定
        const cleanedRewardSetting = cleanupCorruptedJsonString(storedRewardSetting);
        setRewardSetting(cleanedRewardSetting);
        
        // クリーンアップした値が元の値と異なる場合、修正された値で再保存
        if (cleanedRewardSetting !== storedRewardSetting) {
          console.log('🔧 Cleaning up corrupted rewardSetting:', storedRewardSetting, '→', cleanedRewardSetting);
          localStorage.setItem("habitRewardSetting", JSON.stringify(cleanedRewardSetting));
        }
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
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  // データ保存のuseEffect
  useEffect(() => {
    if (isLoaded) {
      const pointsCount = Object.keys(points).length;
      const totalPoints = Object.values(points).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
      
      if (pointsCount > 0 && totalPoints > 0) {
        console.log(`💾 Saving valid points (${pointsCount} items, ${totalPoints} total) to localStorage`);
        saveDataToLocalStorage('points', points);
      } else {
        console.log(`⏭️ Skipping invalid points (${pointsCount} items, ${totalPoints} total)`);
      }
    }
  }, [points, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const today = getTodayString();
      const completionData = { date: today, completed: todayDone };
      console.log('💾 Saving completion data:', completionData);
      saveDataToLocalStorage('completionData', completionData);
    }
  }, [todayDone, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDataToLocalStorage('rewardSetting', rewardSetting);
    }
  }, [rewardSetting, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDataToLocalStorage('goals', goals);
    }
  }, [goals, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDataToLocalStorage('selfTalkMessages', selfTalkMessages);
    }
  }, [selfTalkMessages, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDataToLocalStorage('oneTimeTasks', oneTimeTasks);
    }
  }, [oneTimeTasks, isLoaded]);

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