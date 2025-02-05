import 'dotenv/config'; // If you're manually loading .env
import admin from "firebase-admin";
import serviceAccount from './sonoratiresinc-firebase-adminsdk-wl5h5-95167faa50.json' with { type: "json" };

const FIREBASE_DATABASE_EMULATOR_HOST = process.env.DATABASE_EMULATOR_HOST;
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sonoratiresinc-default-rtdb.firebaseio.com",
  storageBucket: 'sonoratiresinc.firebasestorage.app'
});

const storage = admin.storage();
storage.emulatorHost = 'localhost:9199';

export const firestoreDb = admin.firestore();
export const realtimeDb = admin.database();
export const storageInstance = storage;


admin.firestore().settings({
  host: "localhost:8080",
  ssl:false
});

export default app;