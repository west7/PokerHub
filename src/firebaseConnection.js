// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDU5GTpOnTcaih_PCPd9x-L7Xq2nSLC-Q",
    authDomain: "pokerapp-67e8e.firebaseapp.com",
    projectId: "pokerapp-67e8e",
    storageBucket: "pokerapp-67e8e.appspot.com",
    messagingSenderId: "360870250713",
    appId: "1:360870250713:web:2c1c6bb1752452a48ed6c8",
    measurementId: "G-LM4C6EYFRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};