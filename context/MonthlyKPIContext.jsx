import { useState, createContext, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const MonthlyKPIContext = createContext();

export const MonthlyKPIProvider = ({ children }) => {
  const [monthlyKPIs, setMonthlyKPIs] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期データ読み込み
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('monthlyKPIs');
        if (saved) {
          setMonthlyKPIs(JSON.parse(saved));
        }
      } catch (error) {
        console.error('月次KPIデータの読み込みエラー:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // データ保存
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('monthlyKPIs', JSON.stringify(monthlyKPIs));
      } catch (error) {
        console.error('月次KPIデータの保存エラー:', error);
      }
    }
  }, [monthlyKPIs, isLoaded]);

  // 現在の月のキーを取得
  const getCurrentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // 空のKPIデータを作成
  const createEmptyKPIData = () => ({
    primaryKPIs: {
      avgStayTime: { minutes: 0, seconds: 0 },
      bounceRate: 0,
      repeatRate: 0,
      internalLinkClickRate: 0,
      commentsAndInquiries: 0,
      snsShares: 0
    },
    secondaryKPIs: {
      monthlyPV: 0,
      monthlyPVChange: 0,
      searchTrafficRate: 0,
      improvedRankingArticles: 0,
      revisedArticles: 0,
      newArticles: 0
    },
    lastUpdated: new Date().toISOString()
  });

  // 指定月のKPIデータを取得
  const getKPIData = (monthKey) => {
    return monthlyKPIs[monthKey] || createEmptyKPIData();
  };

  // 指定月のKPIデータを更新
  const updateKPIData = (monthKey, kpiData) => {
    setMonthlyKPIs(prev => ({
      ...prev,
      [monthKey]: {
        ...kpiData,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  // 現在月のKPIデータを更新
  const updateCurrentMonthKPI = (kpiData) => {
    const currentMonth = getCurrentMonthKey();
    updateKPIData(currentMonth, kpiData);
  };

  // 利用可能な月のリストを取得（降順）
  const getAvailableMonths = () => {
    return Object.keys(monthlyKPIs).sort().reverse();
  };

  // KPIデータを削除
  const deleteKPIData = (monthKey) => {
    setMonthlyKPIs(prev => {
      const newData = { ...prev };
      delete newData[monthKey];
      return newData;
    });
  };

  // 月間データをエクスポート
  const exportMonthlyData = () => {
    return JSON.stringify(monthlyKPIs, null, 2);
  };

  // 月間データをインポート
  const importMonthlyData = (jsonData) => {
    try {
      const importedData = JSON.parse(jsonData);
      setMonthlyKPIs(importedData);
      return true;
    } catch (error) {
      console.error('月次KPIデータのインポートエラー:', error);
      return false;
    }
  };

  // Firebaseへの同期
  const syncToFirebase = async (userId) => {
    if (!db || !userId) {
      throw new Error('Firebase未初期化またはユーザーIDが未設定です');
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        monthlyKPIs: monthlyKPIs,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Firebaseへの同期エラー:', error);
      throw error;
    }
  };

  // Firebaseからの復元
  const restoreFromFirebase = async (userId) => {
    if (!db || !userId) {
      throw new Error('Firebase未初期化またはユーザーIDが未設定です');
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.monthlyKPIs) {
          setMonthlyKPIs(userData.monthlyKPIs);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Firebaseからの復元エラー:', error);
      throw error;
    }
  };

  const value = {
    monthlyKPIs,
    isLoaded,
    getCurrentMonthKey,
    getKPIData,
    updateKPIData,
    updateCurrentMonthKPI,
    getAvailableMonths,
    deleteKPIData,
    exportMonthlyData,
    importMonthlyData,
    createEmptyKPIData,
    syncToFirebase,
    restoreFromFirebase
  };

  return (
    <MonthlyKPIContext.Provider value={value}>
      {children}
    </MonthlyKPIContext.Provider>
  );
};

export default MonthlyKPIContext;