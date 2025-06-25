import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration - 本番環境用設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCD36PITW8Ll51kO9Qb-0lX0G1Ea6KEtbY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "habit-tracker-app-1f70f.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "habit-tracker-app-1f70f",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "habit-tracker-app-1f70f.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "895349063791",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:895349063791:web:6cd71e751290da14cf4d9a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-NP946EQE5K"
};

// 🔍 Firebase設定デバッグ情報
console.log('🔍 Firebase Configuration Debug:');
console.log('- Environment:', process.env.NODE_ENV);
console.log('- Window available:', typeof window !== 'undefined');
console.log('- API Key exists:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log('- Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT SET');
console.log('- All env vars:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '***SET***' : 'NOT SET',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NOT SET',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT SET',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'NOT SET',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'NOT SET',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'NOT SET'
});

let app;
let db;
let auth;

// Firebase初期化 - フォールバック設定も含めて常に実行
if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  try {
    console.log('🚀 Attempting Firebase initialization...');
    console.log('🔧 Using config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });
    
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    console.log('✅ Firebase initialized successfully!');
    console.log('✅ Firestore available:', !!db);
    console.log('✅ Auth available:', !!auth);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
  }
} else {
  const reasons = [];
  if (typeof window === 'undefined') reasons.push('Server-side rendering');
  if (!firebaseConfig.apiKey) reasons.push('Missing API key');
  
  console.log('⚠️ Firebase not initialized');
  console.log('⚠️ Reasons:', reasons);
  console.log('⚠️ Will fallback to localStorage');
}

export { db, auth };
export default app;