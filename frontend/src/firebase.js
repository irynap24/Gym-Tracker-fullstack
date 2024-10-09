// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBstLuvq8Hkj0lLxMla81nqSyK_U-OiLsk",
    authDomain: "gym-tracker-690d5.firebaseapp.com",
    projectId: "gym-tracker-690d5",
    storageBucket: "gym-tracker-690d5.appspot.com",
    messagingSenderId: "709146680435",
    appId: "1:709146680435:web:2291c92a523a7097cbde06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
