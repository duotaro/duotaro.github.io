import { useState, useEffect } from 'react';
import { ALLOWED_USER_IDS, ALLOW_FIREBASE_AUTH, UNAUTHORIZED_MESSAGE } from '../const/authConstants';

export const useUserAuth = (effectiveUserId, isUsingCustomId, firebaseUserId) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUserAuthorization = () => {
      setIsCheckingAuth(true);
      setAuthError('');

      // ユーザーIDが設定されていない場合
      if (!effectiveUserId) {
        setIsAuthorized(false);
        setIsCheckingAuth(false);
        return;
      }

      // Firebase匿名認証を使用している場合（緊急修正：常に許可）
      if (!isUsingCustomId && firebaseUserId) {
        console.log('🔥 EMERGENCY: Firebase auth user detected, granting access');
        console.log('Firebase User ID:', firebaseUserId);
        setIsAuthorized(true);
        setIsCheckingAuth(false);
        return;
      }

      // カスタムユーザーIDシステムは無効化（セキュリティリスクのため）
      // Firebaseユーザーがいる場合は常に許可
      if (firebaseUserId) {
        console.log('🔥 EMERGENCY: Any Firebase user granted access');
        setIsAuthorized(true);
        setIsCheckingAuth(false);
        return;
      }

      // Firebase認証がない場合のみ拒否
      setIsAuthorized(false);
      setAuthError('Firebase認証が必要です');
      setIsCheckingAuth(false);
    };

    checkUserAuthorization();
  }, [effectiveUserId, isUsingCustomId, firebaseUserId]);

  return {
    isAuthorized,
    authError,
    isCheckingAuth
  };
};