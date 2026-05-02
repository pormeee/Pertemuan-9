import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYL9nx-cDVwnSNzdZKcwOSroo0usDkrEk",
  authDomain: "p9-pmobb.firebaseapp.com",
  projectId: "p9-pmobb",
  storageBucket: "p9-pmobb.firebasestorage.app",
  messagingSenderId: "820390768046",
  appId: "1:820390768046:web:2e804a9c3ce5762f2d2c3f",
  measurementId: "G-ZFR5GYLTP1"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);