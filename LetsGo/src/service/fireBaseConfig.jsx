// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa-0lqXpXeZPzrxjeBgZRbJV-UPS1IoiY",
  authDomain: "letsgo-307c5.firebaseapp.com",
  projectId: "letsgo-307c5",
  storageBucket: "letsgo-307c5.firebasestorage.app",
  messagingSenderId: "211180267792",
  appId: "1:211180267792:web:afbd3b030cdccac4f21d95",
  measurementId: "G-3YT8D7739W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);