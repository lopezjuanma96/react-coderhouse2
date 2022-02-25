// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbF937fmKTjUQf3deU35Df2lUx3pkkx7M",
  authDomain: "react-coderhouse-25568.firebaseapp.com",
  projectId: "react-coderhouse-25568",
  storageBucket: "react-coderhouse-25568.appspot.com",
  messagingSenderId: "905684116661",
  appId: "1:905684116661:web:877fa3c0e8aa02b4d78afc",
  measurementId: "G-EYBFCQYFHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);