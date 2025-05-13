// inisialisasi firebase (buat baru)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkz8zK9wttWwh5SnQc9nePJl3QTbtU7F4",
  authDomain: "moneytracker-4821b.firebaseapp.com",
  projectId: "moneytracker-4821b",
  storageBucket: "moneytracker-4821b.firebasestorage.app",
  messagingSenderId: "640537790576",
  appId: "1:640537790576:web:c5e53157a5b1594e224cb5",
  databaseURL: "https://moneytracker-4821b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
