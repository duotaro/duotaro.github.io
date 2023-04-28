// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log(firebaseConfig)

let firebaseApp = FirebaseApp;

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const analyticsMock = {
//     logEvent: () => {},
//     setCurrentScreen: () => {},
//     setUserId: () => {},
// }
//const analytics = isSupported() ? getAnalytics(app) : analyticsMock;
//const analytics = isSupported().then(yes => yes ? getAnalytics(app) : analyticsMock);

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
if (typeof window !== "undefined" && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
}
export { firebaseApp };