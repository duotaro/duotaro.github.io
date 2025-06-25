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

      // Firebase匿名認証を使用している場合
      if (!isUsingCustomId && firebaseUserId) {
        if (ALLOW_FIREBASE_AUTH) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          setAuthError('Firebase匿名認証は無効になっています。カスタムユーザーIDを使用してください。');
        }
        setIsCheckingAuth(false);
        return;
      }

      // カスタムユーザーIDを使用している場合
      if (isUsingCustomId && effectiveUserId) {
        if (ALLOWED_USER_IDS.includes(effectiveUserId)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          setAuthError(UNAUTHORIZED_MESSAGE);
        }
        setIsCheckingAuth(false);
        return;
      }

      // その他の場合
      setIsAuthorized(false);
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