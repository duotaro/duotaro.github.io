import { useState, useEffect } from 'react';

export const useUserAuth = (effectiveUserId, isUsingCustomId, firebaseUserId) => {
  const [isAuthorized, setIsAuthorized] = useState(true); // 常に許可
  const [authError, setAuthError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(false); // チェック不要

  // 制限を撤廃：常にアクセスを許可
  useEffect(() => {
    console.log('🔓 Access restrictions removed - all users allowed');
    setIsAuthorized(true);
    setIsCheckingAuth(false);
  }, []);

  return {
    isAuthorized,
    authError,
    isCheckingAuth
  };
};