import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyBDU5GTpOnTcaih_PCPd9x-L7Xq2nSLC-Q",
    authDomain: "pokerapp-67e8e.firebaseapp.com",
    projectId: "pokerapp-67e8e",
    storageBucket: "pokerapp-67e8e.appspot.com",
    messagingSenderId: "360870250713",
    appId: "1:360870250713:web:2c1c6bb1752452a48ed6c8",
    measurementId: "G-LM4C6EYFRP"
};

// Initialize Firebaser
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = (() => {
    if (Platform.OS !== 'web') {
        return initializeAuth(FIREBASE_APP, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } else {
        return  getAuth(FIREBASE_APP);
    }
})();

export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };