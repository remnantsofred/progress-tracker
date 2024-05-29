import 'firebaseui/dist/firebaseui.css'
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';


const config = {
  apiKey: "AIzaSyBBoiLPu7_MQtORnBFXzuYNx9Usrhw5Hp0",
  authDomain: "hufflam-task-tracker.firebaseapp.com",
  projectId: "hufflam-task-tracker",
  storageBucket: "hufflam-task-tracker.appspot.com",
  messagingSenderId: "541359322776",
  appId: "1:541359322776:web:438f16a0f3b08f1a30c2ed",
  measurementId: "G-YD4DKV6JB2"
};


// initialie firebase and make available via import
export const firebaseApp = firebase.initializeApp(config);
export const db = getFirestore(firebaseApp);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
