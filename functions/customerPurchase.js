// functions/customerPurchase.js
import admin from './admin.js';
import * as functions from 'firebase-functions';
import cors from 'cors';

const db = admin.firestore();

export const postCustomerPurchase = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ success: false, message: 'Method Not Allowed' });
        }

        const data = req.body;

        // Required fields for validation
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 'carMake', 'carModel',
            'carProfile', 'carYear', 'wheelSize', 'tireSelection', 'tireQuantity',
            'total', 'date', 'apptDate'
        ];

        // Validate data
        for (const field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Invalid data: Missing or empty field '${field}'`
                });
            }
        }

        try {
            const purchaseRef = await db.collection('purchases').add(data);
            res.status(200).json({ 
                success: true, 
                message: 'Data is valid and submission was successful', 
                purchaseId: purchaseRef.id 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to write valid data to database', 
                error: error.message 
            });
        }
    });
});