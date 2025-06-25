import { useState, useEffect } from 'react';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useHabitData = () => {
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

  // 初期データ読み込み
  useEffect(() => {
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

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habitOneTimeTasks", JSON.stringify(oneTimeTasks));
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