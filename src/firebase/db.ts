// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTfM4rNzFlTnneLw8PAquaSgxFjt9si9Y",
  authDomain: "excel-uploader-5722d.firebaseapp.com",
  projectId: "excel-uploader-5722d",
  storageBucket: "excel-uploader-5722d.appspot.com",
  messagingSenderId: "668322671074",
  appId: "1:668322671074:web:36237c21cd91768155b1bb",
  measurementId: "G-HEFT0CBNL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const db = getFirestore(app);


export { db };