// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-d4bc7.firebaseapp.com",
  projectId: "estate-d4bc7",
  storageBucket: "estate-d4bc7.appspot.com",
  messagingSenderId: "584082044455",
  appId: "1:584082044455:web:e5177474a720be218e0002"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);