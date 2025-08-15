
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH,
  projectId: import.meta.env.VITE_FB_PROJECT,
  storageBucket: import.meta.env.VITE_FB_STORAGE,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING,
  appId: import.meta.env.VITE_FB_API_ID
};

console.log("apikey",import.meta.env.VITE_FB_API_KEY)
console.log("authDomain",import.meta.env.VITE_FB_AUTH)


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);