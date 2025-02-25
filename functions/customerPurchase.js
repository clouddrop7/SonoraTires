import admin from './admin.js';
import * as functions from 'firebase-functions';

const db = admin.firestore();
export const postCustomerPurchase = functions.https.onCall(async (data, context) => {
    try {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 'carMake', 'carModel',
            'carProfile', 'carYear', 'wheelSize', 'tireSelection', 'tireQuantity',
            'total', 'date', 'apptDate'
        ];
        for (const field of requiredFields) {
            if (!data[field]) {
                throw new functions.https.HttpsError('invalid-argument', `Missing required field: ${field}`);
            }
        }
        console.log(data);
        const purchaseData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            carMake: data.carMake,
            carModel: data.carModel,
            carProfile: data.carProfile,
            carYear: data.carYear,
            wheelSize: data.wheelSize,
            tireSelection: data.tireSelection,
            tireQuantity: data.tireQuantity,
            total: data.total,
            date: data.date,
            apptDate: data.apptDate, 
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }
        const purchaseRef = await db.collection('purchases').add(purchaseData);

        console.log('Customer purchase saved with ID:', purchaseRef.id);
        return {
            success: true,
            purchaseId: purchaseRef.id,
            message: 'Purchase submitted successfully',
        };
    } catch (error) {
        console.error('Error submitting customer purchase:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'An error occurred while submitting the purchase', error.message);
    }
});