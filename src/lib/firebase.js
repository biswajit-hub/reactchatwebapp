import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyCzLPf24NUuzjl7doOC6GeB8YVn8gFNzmM",
  authDomain: "reactchatapllication.firebaseapp.com",
  projectId: "reactchatapllication",
  storageBucket: "reactchatapllication.appspot.com",
  messagingSenderId: "696510496914",
  appId: "1:696510496914:web:8716d533ebffeec0c4e64b",
  measurementId: "G-NQY4GD9564",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
