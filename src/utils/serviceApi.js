import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

export const fetchServices = createAsyncThunk('services/fetchServices', async() => {
    try {
        const  querySnapshot = await getDocs(collection(db, 'services'));
        const  services = [];
        
        querySnapshot.forEach((doc) => {
            services.push({id: doc.id, ...doc.data() });
        });

        services.sort((a,b) => b.name.localeCompare(a.name));
        return services;

    } catch (error) {
        console.error('Error fetching services from firestore: ', error);
        throw error;
    }
});

const initialState = {
    servicesArray : [],
    isLoading: false,
    errMsg: ''
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {

    },
    extraReducers: (builder =>
        builder 
        .addCase(fetchServices.pending, (state) => {
            state.isLoading = true;
            state.errMsg = '';
        })
        .addCase(fetchServices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.servicesArray = action.payload;
        })
        .addCase(fetchServices.rejected, (state, action) => {
            state.isLoading = false;
            state.errMsg = action.payload;
        })
    )
});

export const ServicesReducer = servicesSlice.reducer;

export const services = (state) => {
    return state.services.servicesArray;
}