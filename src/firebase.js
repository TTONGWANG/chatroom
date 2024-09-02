import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD0Dj7fXKHLwIe1tFpT-vs_YyCL3bDNjQQ",
  authDomain: "chat-377dd.firebaseapp.com",
  projectId: "chat-377dd",
  storageBucket: "chat-377dd.appspot.com",
  messagingSenderId: "525226953187",
  appId: "1:525226953187:web:833cb6b7b99240e8ff38d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
