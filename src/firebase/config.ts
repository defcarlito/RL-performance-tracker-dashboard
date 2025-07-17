// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW2D4CghUuYmcHSHgz9NJS4Z1HVeWRJqw",
  authDomain: "rl-stat-puller.firebaseapp.com",
  projectId: "rl-stat-puller",
  storageBucket: "rl-stat-puller.firebasestorage.app",
  messagingSenderId: "1057204807590",
  appId: "1:1057204807590:web:0f92dacce6d2c5a3b7d167",
  measurementId: "G-XCJNKW65ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);