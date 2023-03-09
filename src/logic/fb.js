import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFA-5nXqjJB4k7KmZ58kkNFnR8E4AjM7g',
  authDomain: 'droniada-test-2023.firebaseapp.com',
  projectId: 'droniada-test-2023',
  storageBucket: 'droniada-test-2023.appspot.com',
  messagingSenderId: '1083035363782',
  appId: '1:1083035363782:web:b261a64231125133dfeac7',
  measurementId: 'G-RV30JDR43X'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
