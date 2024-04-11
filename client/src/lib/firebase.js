// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blinklink-aca6e.firebaseapp.com",
  projectId: "blinklink-aca6e",
  storageBucket: "blinklink-aca6e.appspot.com",
  messagingSenderId: "667905639272",
  appId: "1:667905639272:web:16797ae378d33017804cdd",
  measurementId: "G-7QJ8Y51RM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics}