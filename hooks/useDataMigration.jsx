import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEFAULT_GOALS } from '../const/goalConstants';
import { DEFAULT_SELF_TALK } from '../const/selfTalkConstants';

export const useDataMigration = (userId) => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState('');

  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  // LocalStorageからFirestoreへのデータ移行
  const migrateFromLocalStorage = async () => {
    if (!userId || !db) {
      setMigrationStatus('Firebase が利用できません');
      return false;
    }

    setIsMigrating(true);
    setMigrationStatus('LocalStorage からデータを読み込み中...');

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

      setMigrationStatus('Firestore にデータを保存中...');

      // Firestoreに移行データを保存
      const migrationData = {
        points: storedPoints,
        oneTimeTasks: storedOneTimeTasks,
        startDate: storedStartDate || today,
        rewardSetting: storedRewardSetting || "100ptでラーメンを食べてOK",
        goals: storedGoals || DEFAULT_GOALS,
        selfTalkMessages: storedSelfTalk || DEFAULT_SELF_TALK,
        completionData: storedCompletion.date === today ? storedCompletion : { date: today, completed: [] },
        migratedAt: new Date().toISOString(),
        migratedFrom: 'localStorage'
      };

      const userDocRef = doc(db, 'habitData', userId);
      await setDoc(userDocRef, migrationData);

      setMigrationStatus('移行完了！データがFirestoreに保存されました');
      setIsMigrating(false);
      
      return true;
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationStatus(`移行エラー: ${error.message}`);
      setIsMigrating(false);
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

  // LocalStorageデータのバックアップ
  const downloadBackup = () => {
    const { hasData, data } = checkLocalStorageData();
    
    if (!hasData) {
      setMigrationStatus('バックアップするデータがありません');
      return;
    }

    const backupData = {
      ...data,
      backupDate: new Date().toISOString(),
      backupSource: 'localStorage',
      version: '1.0'
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setMigrationStatus('バックアップファイルをダウンロードしました');
  };

  // バックアップからの復元
  const restoreFromBackup = (backupData) => {
    try {
      if (backupData.points) {
        localStorage.setItem("habitPoints", JSON.stringify(backupData.points));
      }
      if (backupData.completion) {
        localStorage.setItem("habitCompletion", JSON.stringify(backupData.completion));
      }
      if (backupData.startDate) {
        localStorage.setItem("habitStartDate", backupData.startDate);
      }
      if (backupData.rewardSetting) {
        localStorage.setItem("habitRewardSetting", backupData.rewardSetting);
      }
      if (backupData.goals) {
        localStorage.setItem("habitGoals", JSON.stringify(backupData.goals));
      }
      if (backupData.selfTalk) {
        localStorage.setItem("habitSelfTalk", JSON.stringify(backupData.selfTalk));
      }
      if (backupData.oneTimeTasks) {
        localStorage.setItem("habitOneTimeTasks", JSON.stringify(backupData.oneTimeTasks));
      }
      
      setMigrationStatus('バックアップからの復元が完了しました');
      return true;
    } catch (error) {
      console.error('Restore error:', error);
      setMigrationStatus(`復元エラー: ${error.message}`);
      return false;
    }
  };

  return {
    isMigrating,
    migrationStatus,
    migrateFromLocalStorage,
    checkLocalStorageData,
    downloadBackup,
    restoreFromBackup
  };
};