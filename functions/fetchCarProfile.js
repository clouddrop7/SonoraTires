import admin from './admin.js';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

export const fetchCarProfile = functions.https.onRequest((req, res) => {
  return cors({ origin: true })(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      const { make, model, year } = req.query;

      if (!make && !model && !year) {
        return res.status(400).json({ success: false, error: 'Make parameter is required' });
      }

      const url = `https://api.wheel-size.com/v2/modifications/?make=${make}&model=${model}&region=usdm&year=${year}&user_key=3ee807b5af97fd58bf363faef19cb7fd`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const carProfileData = await response.json();
      res.status(200).json({ success: true, data: carProfileData });
    } catch (error) {
      console.error('Error fetching car model data:', error);
      res.status(500).json({ success: false, error: 'An error occurred while fetching car model data', details: error.message });
    }
  });
});