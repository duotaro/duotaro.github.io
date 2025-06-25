import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // 既存プロジェクト設定（GitHub Pages用）
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCJRa5KKE0R26vWOe7kU0jc0-_Qh0k8E2c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "habit-tracker-dev-33154.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "habit-tracker-dev-33154",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "habit-tracker-dev-33154.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "760239172659",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:760239172659:web:65174b62e39c75fa844746"
};

let app;
let db;
let auth;

if (typeof window !== 'undefined') {
  try {
    console.log('Initializing Firebase with config:', firebaseConfig.projectId);
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { db, auth };
export default app;