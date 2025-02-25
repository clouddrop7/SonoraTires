import admin from './admin.js';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

export const fetchTires = functions.https.onRequest((req, res) => {
  return cors({ origin: true })(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      const { tireSize } = req.query;

      if (!tireSize) {
        return res.status(400).json({ success: false, error: 'Tire size parameter is required' });
      }

      // Encode only forward slashes in tireSize as %2F, use & for region
      const encodedTireSize = tireSize.replace(/\//g, '%2F');
      const url = `https://api.wheel-size.com/v2/tires/search/advanced/?t=${encodedTireSize}&r=usdm&user_key=3ee807b5af97fd58bf363faef19cb7fd`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tireData = await response.json();

      res.status(200).json({ success: true, data: tireData });
    } catch (error) {
      console.error('Error fetching tire data:', error);
      res.status(500).json({ success: false, error: 'An error occurred while fetching tire data', details: error.message });
    }
  });
});