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
    console.log('🔍 useFirebaseAuth Debug:');
    console.log('- Auth instance available:', !!auth);
    console.log('- Window available:', typeof window !== 'undefined');
    console.log('- API Key set:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    
    if (!auth) {
      console.log('⚠️ useFirebaseAuth: No auth instance, checking localStorage for fallback');
      console.log('⚠️ Reason: Firebase not initialized or environment variables missing');
      // Firebaseが利用できない場合のフォールバック
      const passwordAuthStatus = localStorage.getItem("habitPasswordAuth");
      if (passwordAuthStatus === "authenticated") {
        console.log('📱 Using localStorage fallback authentication');
        setIsAuthenticated(true);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('useFirebaseAuth: Auth state changed', { user: !!firebaseUser });
      
      if (firebaseUser) {
        setUser(firebaseUser);
        // UID を表示（Firestoreルール設定用）
        console.log('🔑 Your Firebase UID for Firestore rules:', firebaseUser.uid);
        
        // UIDを表示（Firestoreルールで設定が必要）
        console.log('✅ Firebase authentication successful');
        console.log('⚠️ IMPORTANT: Add this UID to Firestore rules allowedUIDs list:');
        console.log('UID:', firebaseUser.uid);
        console.log('Project:', 'habit-tracker-app-1f70f');
        
        // パスワード認証状態をチェック
        const passwordAuthStatus = localStorage.getItem("habitPasswordAuth");
        console.log('useFirebaseAuth: Password auth status', passwordAuthStatus);
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
    console.log('useFirebaseAuth: Password submit attempt');
    
    if (passwordInput === CORRECT_PASSWORD) {
      try {
        console.log('useFirebaseAuth: Password correct, attempting Firebase auth', { auth: !!auth, user: !!user });
        
        // パスワードが正しい場合、匿名認証でFirebaseにサインイン
        if (auth && !user) {
          console.log('useFirebaseAuth: Signing in anonymously...');
          await signInAnonymously(auth);
          console.log('useFirebaseAuth: Anonymous sign-in successful');
        } else if (!auth) {
          console.log('useFirebaseAuth: No Firebase auth available, using fallback');
        }
        
        setIsAuthenticated(true);
        localStorage.setItem("habitPasswordAuth", "authenticated");
        setPasswordError("");
      } catch (error) {
        console.error('Authentication error:', error);
        // Firebaseエラーの場合でもローカル認証は通す
        setIsAuthenticated(true);
        localStorage.setItem("habitPasswordAuth", "authenticated");
        setPasswordError("");
        console.log('useFirebaseAuth: Using fallback authentication due to Firebase error');
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