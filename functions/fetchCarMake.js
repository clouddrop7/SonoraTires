import admin from './admin.js';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

export const fetchCarMake = functions.https.onRequest(async (req, res) => {
  cors({ origin: true })(req, res, async () => {
    try {
      const url = `https://api.wheel-size.com/v2/makes/?region=usdm&user_key=3ee807b5af97fd58bf363faef19cb7fd`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const carMakeData = await response.json();

      res.status(200).json({ success: true, data: carMakeData });
    } catch (error) {
      console.error('Error fetching car make data:', error);
      res.status(500).json({ success: false, error: 'An error occurred while fetching car make data', details: error.message });
    }
  });
});