// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider } from "firebase/auth" //!for signin in n auth
import {getFirestore} from "firebase/firestore" //! for storin posts
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ7rHkEz78cTjnQ3Vt-9uqCCY31ZmsAE0",
  authDomain: "chaty-40042.firebaseapp.com",
  projectId: "chaty-40042",
  storageBucket: "chaty-40042.appspot.com",
  messagingSenderId: "602322352902",
  appId: "1:602322352902:web:f99670eccb34d13e76fc87",
  measurementId: "G-X70FG9VGHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);
export const provider= new GoogleAuthProvider(); //!for sign in

export const db = getFirestore(); //!db-database for storin