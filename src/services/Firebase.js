
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT-FhKMVw2_u5rE-cpcv_KaNleSoReQkg",
  authDomain: "fir-crud-55a2c.firebaseapp.com",
  projectId: "fir-crud-55a2c",
  storageBucket: "fir-crud-55a2c.firebasestorage.app",
  messagingSenderId: "990887184966",
  appId: "1:990887184966:web:314d048145a2f78beb9847"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);