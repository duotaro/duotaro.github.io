import { useState, useEffect } from 'react';

export const useUserIdManager = () => {
  const [customUserId, setCustomUserId] = useState('');
  const [isUsingCustomId, setIsUsingCustomId] = useState(false);
  const [showUserIdInput, setShowUserIdInput] = useState(false);

  // カスタムユーザーIDの管理
  useEffect(() => {
    const savedCustomId = localStorage.getItem('customUserId');
    const usingCustom = localStorage.getItem('isUsingCustomId') === 'true';
    
    if (savedCustomId && usingCustom) {
      setCustomUserId(savedCustomId);
      setIsUsingCustomId(true);
    }
  }, []);

  // カスタムユーザーIDを設定
  const setUserIdMode = (useCustom, userId = '') => {
    if (useCustom && userId.trim()) {
      // カスタムIDを使用
      setCustomUserId(userId.trim());
      setIsUsingCustomId(true);
      localStorage.setItem('customUserId', userId.trim());
      localStorage.setItem('isUsingCustomId', 'true');
    } else {
      // Firebase匿名認証を使用
      setCustomUserId('');
      setIsUsingCustomId(false);
      localStorage.removeItem('customUserId');
      localStorage.removeItem('isUsingCustomId');
    }
    setShowUserIdInput(false);
  };

  // 実際に使用するユーザーIDを取得
  const getEffectiveUserId = (firebaseUserId) => {
    return isUsingCustomId ? customUserId : firebaseUserId;
  };

  // ユーザーID入力のリセット
  const resetUserIdInput = () => {
    setShowUserIdInput(false);
  };

  // カスタムユーザーIDの検証
  const validateUserId = (userId) => {
    const trimmed = userId.trim();
    if (trimmed.length < 3) {
      return 'ユーザーIDは3文字以上で入力してください';
    }
    if (trimmed.length > 50) {
      return 'ユーザーIDは50文字以下で入力してください';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return 'ユーザーIDは英数字、ハイフン、アンダースコアのみ使用できます';
    }
    return null;
  };

  return {
    customUserId,
    isUsingCustomId,
    showUserIdInput,
    setShowUserIdInput,
    setUserIdMode,
    getEffectiveUserId,
    resetUserIdInput,
    validateUserId
  };
};