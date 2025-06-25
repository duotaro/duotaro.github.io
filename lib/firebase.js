import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // 本番環境用設定（GitHub Pages用）
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDyNM3G0N5OUwGkjM2dP7H9JSz5q8Lvm6c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "habit-tracker-prod-e6c98.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "habit-tracker-prod-e6c98",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "habit-tracker-prod-e6c98.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1003842516127",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1003842516127:web:f2a4c3b5d6e7f8g9h0j1k2"
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