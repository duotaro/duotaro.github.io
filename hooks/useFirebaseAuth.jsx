import { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { CORRECT_PASSWORD } from '../const/habitConstants';

export const useFirebaseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase Auth状態の監視
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // パスワード認証状態をチェック
        const passwordAuthStatus = localStorage.getItem("habitPasswordAuth");
        if (passwordAuthStatus === "authenticated") {
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // パスワード検証関数
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      try {
        // パスワードが正しい場合、匿名認証でFirebaseにサインイン
        if (auth && !user) {
          await signInAnonymously(auth);
        }
        setIsAuthenticated(true);
        localStorage.setItem("habitPasswordAuth", "authenticated");
        setPasswordError("");
      } catch (error) {
        console.error('Authentication error:', error);
        setPasswordError("認証エラーが発生しました");
      }
    } else {
      setPasswordError("パスワードが正しくありません");
      setPasswordInput("");
    }
  };

  // ログアウト関数
  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setIsAuthenticated(false);
      localStorage.removeItem("habitPasswordAuth");
      setPasswordInput("");
      setPasswordError("");
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    passwordInput,
    setPasswordInput,
    passwordError,
    handlePasswordSubmit,
    handleLogout,
    user,
    loading
  };
};