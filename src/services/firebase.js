import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcmHziavvQc66LbYjU840QTWsWDsGnnpo",
  authDomain: "bhashaguru-6b9b3.firebaseapp.com",
  projectId: "bhashaguru-6b9b3",
  storageBucket: "bhashaguru-6b9b3.firebasestorage.app",
  messagingSenderId: "113206831281",
  appId: "1:113206831281:web:09c3a40e9087b83aec1a90",
  measurementId: "G-2B7071S18P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
