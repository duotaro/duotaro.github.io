import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration - 環境変数から読み込み
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

// Firebase初期化 - 環境変数が設定されている場合のみ
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
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
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) reasons.push('Missing API key');
  
  console.log('⚠️ Firebase not initialized');
  console.log('⚠️ Reasons:', reasons);
  console.log('⚠️ Will fallback to localStorage');
}

export { db, auth };
export default app;