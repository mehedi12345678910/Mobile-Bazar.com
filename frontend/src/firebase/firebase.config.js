
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACSNXk_4GmjTxfCwjuYgwjyLCza66vfM4",
  authDomain: "assignment11-a015d.firebaseapp.com",
  projectId: "assignment11-a015d",
  storageBucket: "assignment11-a015d.firebasestorage.app",
  messagingSenderId: "995317506415",
  appId: "1:995317506415:web:59e45d461630d0fcd7889a",
  measurementId: "G-4C3TTEBX4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
