
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLPNrfcIKk3Lbu8vgpEVq5no4casg9n60",
  authDomain: "rentalsystem-278d0.firebaseapp.com",
  projectId: "rentalsystem-278d0",
  storageBucket: "rentalsystem-278d0.firebasestorage.app",
  messagingSenderId: "530698861427",
  appId: "1:530698861427:web:7762951829afda7428e306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithEmailAndPassword, signInWithPopup };