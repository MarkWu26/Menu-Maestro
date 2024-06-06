// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdhPDilYkgdaT80ttKyyXoElJqDzFy8Bo",
  authDomain: "utak-resto.firebaseapp.com",
  databaseURL: "https://utak-resto-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-resto",
  storageBucket: "utak-resto.appspot.com",
  messagingSenderId: "1075001472525",
  appId: "1:1075001472525:web:02ff1738711515ef410744",
  measurementId: "G-G056RYTGNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const auth = getAuth(app)