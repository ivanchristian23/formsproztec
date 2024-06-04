// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU1tQHRT2KCUgL8VG1_sAlvP4TH7p5w8Y",
  authDomain: "forms-83572.firebaseapp.com",
  projectId: "forms-83572",
  storageBucket: "forms-83572.appspot.com",
  messagingSenderId: "445326415413",
  appId: "1:445326415413:web:f95f7f5b04a9363809837c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
