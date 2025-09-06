// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVtE2wi2MoUYCypHrTEyI0LE5z97F2AIo",
  authDomain: "biomall-ai.firebaseapp.com",
  projectId: "biomall-ai",
  storageBucket: "biomall-ai.appspot.com",
  messagingSenderId: "666417743264",
  appId: "1:666417743264:web:0903785f26bd6c619090c5",
  measurementId: "G-RVB60286MW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };