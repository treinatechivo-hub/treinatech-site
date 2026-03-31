import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYNM56HDmP4HbRGW_zT2EC5G6t1BDoJRI",
  authDomain: "treinatech-3ef28.firebaseapp.com",
  projectId: "treinatech-3ef28",
  storageBucket: "treinatech-3ef28.firebasestorage.app",
  messagingSenderId: "78585439215",
  appId: "1:78585439215:web:af6af74553729711038c1a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
