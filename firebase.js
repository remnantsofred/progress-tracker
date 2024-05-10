// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBoiLPu7_MQtORnBFXzuYNx9Usrhw5Hp0",
  authDomain: "hufflam-task-tracker.firebaseapp.com",
  projectId: "hufflam-task-tracker",
  storageBucket: "hufflam-task-tracker.appspot.com",
  messagingSenderId: "541359322776",
  appId: "1:541359322776:web:438f16a0f3b08f1a30c2ed",
  measurementId: "G-YD4DKV6JB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);