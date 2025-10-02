// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtPH1xmb0_5whDEf9uVX5yIKO0ACiyKe8",
  authDomain: "receta-app-b.firebaseapp.com",
  projectId: "receta-app-b",
  storageBucket: "receta-app-b.firebasestorage.app",
  messagingSenderId: "978455405563",
  appId: "1:978455405563:web:33c8b1180edfa161f5615e",
  measurementId: "G-0QXXDWDVK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);