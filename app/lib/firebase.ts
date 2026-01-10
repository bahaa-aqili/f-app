// // lib/firebase.ts
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // 1️⃣ إعداد Firebase config
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // 2️⃣ منع إعادة التهيئة عند إعادة التحميل
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// // 3️⃣ إعداد Auth و Google Provider
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// // 4️⃣ إعداد Firestore
// export const db = getFirestore(app);
