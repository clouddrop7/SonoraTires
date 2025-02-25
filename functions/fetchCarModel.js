import admin from './admin.js';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

export const fetchCarModel = functions.https.onRequest((req, res) => {
  return cors({ origin: true })(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      const { make } = req.query;

      if (!make) {
        return res.status(400).json({ success: false, error: 'Make parameter is required' });
      }

      const url = `https://api.wheel-size.com/v2/models/?make=${make}&region=usdm&user_key=3ee807b5af97fd58bf363faef19cb7fd`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const carModelData = await response.json();

      res.status(200).json({ success: true, data: carModelData });
    } catch (error) {
      console.error('Error fetching car model data:', error);
      res.status(500).json({ success: false, error: 'An error occurred while fetching car model data', details: error.message });
    }
  });
});