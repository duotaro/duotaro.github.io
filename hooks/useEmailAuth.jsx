import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useEmailAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password) => {
    if (!auth) {
      const errorMessage = 'Firebase認証が利用できません';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    try {
      setError('');
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'アカウント作成に失敗しました';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'このメールアドレスは既に使用されています';
          break;
        case 'auth/invalid-email':
          errorMessage = 'メールアドレスの形式が正しくありません';
          break;
        case 'auth/weak-password':
          errorMessage = 'パスワードは6文字以上で設定してください';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'メール認証が有効になっていません';
          break;
        default:
          errorMessage = `アカウント作成エラー: ${error.message}`;
      }
      
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    if (!auth) {
      const errorMessage = 'Firebase認証が利用できません';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    try {
      setError('');
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'ログインに失敗しました';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'メールアドレスの形式が正しくありません';
          break;
        case 'auth/user-disabled':
          errorMessage = 'このアカウントは無効になっています';
          break;
        case 'auth/user-not-found':
          errorMessage = 'このメールアドレスは登録されていません';
          break;
        case 'auth/wrong-password':
          errorMessage = 'パスワードが正しくありません';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'ログイン試行回数が多すぎます。しばらく時間をおいてから再試行してください';
          break;
        default:
          errorMessage = `ログインエラー: ${error.message}`;
      }
      
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    if (!auth) {
      return { success: true };
    }

    try {
      setError('');
      await signOut(auth);
      return { success: true };
    } catch (error) {
      const errorMessage = `ログアウトエラー: ${error.message}`;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    setError
  };
};