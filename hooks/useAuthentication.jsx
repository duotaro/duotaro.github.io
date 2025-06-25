import { useState, useEffect } from 'react';
import { CORRECT_PASSWORD } from '../const/habitConstants';

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 認証状態の初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem("habitAuthStatus");
      if (authStatus === "authenticated") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // パスワード検証関数
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("habitAuthStatus", "authenticated");
      setPasswordError("");
    } else {
      setPasswordError("パスワードが正しくありません");
      setPasswordInput("");
    }
  };

  // ログアウト関数
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("habitAuthStatus");
    setPasswordInput("");
    setPasswordError("");
  };

  return {
    isAuthenticated,
    passwordInput,
    setPasswordInput,
    passwordError,
    handlePasswordSubmit,
    handleLogout
  };
};