import admin from "firebase-admin";
import serviceAccount from './sonoratiresinc-firebase-adminsdk-wl5h5-95167faa50.json' with { type: "json" };

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default app;
export  { admin };