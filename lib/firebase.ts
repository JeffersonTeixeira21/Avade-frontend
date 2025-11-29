import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

export function getFirebaseApp() {
  if (firebaseApp) return firebaseApp;
  const apps = getApps();
  if (apps.length > 0) {
    firebaseApp = getApp();
  } else {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    firebaseApp = initializeApp(config);
  }
  return firebaseApp;
}

export function getFirestoreDb() {
  if (firestoreDb) return firestoreDb;
  const app = getFirebaseApp();
  firestoreDb = getFirestore(app);
  return firestoreDb;
}
