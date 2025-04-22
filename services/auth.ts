// services/auth.ts
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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

export { auth };
