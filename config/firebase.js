import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCJ0CUeM366YvUIayhH01f7Rkk_UKyRhqM",
    authDomain: "artrypto-dd322.firebaseapp.com",
    projectId: "artrypto-dd322",
    storageBucket: "artrypto-dd322.appspot.com",
    messagingSenderId: "827274695952",
    appId: "1:827274695952:web:057555a5fd434ecd510195"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);