import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAM0YnFndhWA1Eyno2CeueskUunaXvswxE",
  authDomain: "wellnest-e3099.firebaseapp.com",
  projectId: "wellnest-e3099",
  storageBucket: "wellnest-e3099.appspot.com",
  messagingSenderId: "1073610370849",
  appId: "1:1073610370849:web:c1d53473ed97398cb0d860"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

// ✅ VERY IMPORTANT
export { auth, firestore };
