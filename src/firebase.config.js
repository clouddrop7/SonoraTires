import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsczgqiG5qugJvalc2YD6zmVXk2d879dg",
  authDomain: "sonoratiresinc.firebaseapp.com",
  projectId: "sonoratiresinc",
  storageBucket: "sonoratiresinc.firebasestorage.app",
  messagingSenderId: "176165926303",
  appId: "1:176165926303:web:a371a27f14b678eb8f39aa",
  measurementId: "G-NE0GSE9KT7"
};


export default firebaseConfig;


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 