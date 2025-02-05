import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firestoreDb, realtimeDb, storageInstance } from './firebaseconfig.js'; 
const app = express();

// Middleware setup
app.use(cors({ 
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/images/:filename', async (req, res) => {
    try {
      const bucket = storageInstance.bucket();
      const file = bucket.file(req.params.filename);
      
      file.createReadStream()
        .on('error', (err) => {
          console.error('Error reading file:', err);
          res.status(500).send('Error retrieving file');
        })
        .pipe(res);
    } catch (error) {
      console.error('Error getting file:', error);
      res.status(500).send('Error retrieving file');
    }
});



// Export the Express app as a Firebase function
export const api = functions.https.onRequest(app);
