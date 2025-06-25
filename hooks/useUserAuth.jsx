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

      // Firebase匿名認証を使用している場合（常に許可）
      if (!isUsingCustomId && firebaseUserId) {
        console.log('✅ Firebase auth user detected, granting access');
        console.log('Firebase User ID:', firebaseUserId);
        setIsAuthorized(true);
        setIsCheckingAuth(false);
        return;
      }

      // Firebase認証がない場合でも許可（LocalStorageフォールバック）
      console.log('📱 No Firebase auth, using localStorage mode');
      setIsAuthorized(true);
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