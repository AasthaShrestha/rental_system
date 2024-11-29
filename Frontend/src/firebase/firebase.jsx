import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLPNrfcIKk3Lbu8vgpEVq5no4casg9n60",
  authDomain: "rentalsystem-278d0.firebaseapp.com",
  projectId: "rentalsystem-278d0",
  storageBucket: "rentalsystem-278d0.firebasestorage.app",
  messagingSenderId: "530698861427",
  appId: "1:530698861427:web:7762951829afda7428e306",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { auth, googleProvider, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, db, setDoc, doc };
