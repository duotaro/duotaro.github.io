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
    // authが未定義の場合の安全なチェック
    if (typeof auth === 'undefined' || !auth) {
      console.log('📱 Firebase auth unavailable, using localStorage fallback');
      
      // Firebaseが利用できない場合のフォールバック
      if (typeof window !== 'undefined') {
        const passwordAuthStatus = localStorage.getItem("habitPasswordAuth");
        if (passwordAuthStatus === "authenticated") {
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log('✅ Firebase authentication successful, UID:', firebaseUser.uid);
        
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
        if (typeof auth !== 'undefined' && auth && !user) {
          await signInAnonymously(auth);
          console.log('🔐 Anonymous sign-in successful');
        }
        
        setIsAuthenticated(true);
        localStorage.setItem("habitPasswordAuth", "authenticated");
        setPasswordError("");
      } catch (error) {
        console.warn('Firebase auth error, using fallback:', error.message);
        // Firebaseエラーの場合でもローカル認証は通す
        setIsAuthenticated(true);
        localStorage.setItem("habitPasswordAuth", "authenticated");
        setPasswordError("");
      }
    } else {
      setPasswordError("パスワードが正しくありません");
      setPasswordInput("");
    }
  };

  // ログアウト関数
  const handleLogout = async () => {
    try {
      if (typeof auth !== 'undefined' && auth) {
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