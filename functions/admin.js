import admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
}

export default admin;