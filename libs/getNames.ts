import { initializeApp } from "firebase/app";
import firebase_app from "./firebase.config";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

export default async function getNames(name: string) {
  const db = getFirestore(app);
  const q = query(collection(db, name), where("welcome", "==", name));
  const querySnapshot = await getDocs(q);
   return querySnapshot.empty;
// return name;
  
}
