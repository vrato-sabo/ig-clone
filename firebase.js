// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByMeLEZuN4D25aYKbxlF0PO-6Yje8gV5g',
  authDomain: 'ig-clone-e968f.firebaseapp.com',
  projectId: 'ig-clone-e968f',
  storageBucket: 'ig-clone-e968f.appspot.com',
  messagingSenderId: '415205030138',
  appId: '1:415205030138:web:89a291541d3d3485e7b143',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
