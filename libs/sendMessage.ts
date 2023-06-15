import { initializeApp } from "firebase/app";
import { Timestamp, collection, doc, getFirestore, setDoc } from "firebase/firestore"; 

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

export default async function sendMessage(message: string,username:string) {
  const db = getFirestore(app);
  const usersRef = doc(collection(db, username));
  const time = Timestamp.now();
  const result = await setDoc(usersRef, {message,time});


return result;
  
}
