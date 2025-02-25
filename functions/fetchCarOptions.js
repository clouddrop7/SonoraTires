import admin from './admin.js';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

export const fetchCarOptions = functions.https.onRequest((req, res) => {
  return cors({ origin: true })(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      const { make, model, profile, year } = req.query;

      if (!make && !model && !profile && !year  ) {
        return res.status(400).json({ success: false, error: 'Make parameter is required' });
      }

      const url = `https://api.wheel-size.com/v2/search/by_model/?make=${make}&model=${model}&modification=${profile}&year=${year}&user_key=YOUR-API-KEY`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const wheelData = await response.json();

      res.status(200).json({ success: true, data: wheelData });
    } catch (error) {
      console.error('Error fetching car model data:', error);
      res.status(500).json({ success: false, error: 'An error occurred while fetching car model data', details: error.message });
    }
  });
});