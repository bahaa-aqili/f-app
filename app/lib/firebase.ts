// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 1️⃣ إعداد Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbRsVsCTOVDWjv-RHPJFyHvFdqRfmiO-k",
  authDomain: "f-app-27631.firebaseapp.com",
  projectId: "f-app-27631",
  storageBucket: "f-app-27631.firebasestorage.app",
  messagingSenderId: "377735691463",
  appId: "1:377735691463:web:48f65931c40a43cdf292e2",
};

// 2️⃣ منع إعادة التهيئة عند إعادة التحميل
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 3️⃣ إعداد Auth و Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 4️⃣ إعداد Firestore
export const db = getFirestore(app);
