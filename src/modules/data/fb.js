import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAFA-5nXqjJB4k7KmZ58kkNFnR8E4AjM7g',
  authDomain: 'droniada-test-2023.firebaseapp.com',
  projectId: 'droniada-test-2023',
  storageBucket: 'droniada-test-2023.appspot.com',
  messagingSenderId: '1083035363782',
  appId: '1:1083035363782:web:b261a64231125133dfeac7',
  measurementId: 'G-RV30JDR43X'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
