// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpWqOPLDFeC6bUc5sQ1A-RYeHDgsYCMks",
  authDomain: "apps-operations-megb.firebaseapp.com",
  projectId: "apps-operations-megb",
  storageBucket: "apps-operations-megb.firebasestorage.app",
  messagingSenderId: "767871926182",
  appId: "1:767871926182:web:d51a58215f31c89d9dd967",
  measurementId: "G-D8GDHS3JJ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});