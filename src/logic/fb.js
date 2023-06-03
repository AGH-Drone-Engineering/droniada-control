import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB0wMsXKjNJl2pjUxAIgOvA8fbnHT-qRhc",
  authDomain: "dorniada-2.firebaseapp.com",
  projectId: "dorniada-2",
  storageBucket: "dorniada-2.appspot.com",
  messagingSenderId: "1093677567041",
  appId: "1:1093677567041:web:41ce0bdae29b68a8d6cac0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
