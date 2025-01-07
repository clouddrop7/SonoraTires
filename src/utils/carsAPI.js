import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCarData = createAsyncThunk('cars/fetchCarData', async() => {
    const url="https://carapi.app/api/makes"
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // outside the range of 2xx
            console.error('Response error: ', error.response.status);
            if (error.response.status === 400) {
                // Handle bad request
            } else if (error.response.status === 401) {
                // Handle unauthorized
            } else if (error.response.status === 404) {
                // Handle not found
            } else if (error.response.status === 429) {
                // Handle too many requests
            } else {
                // Handle other error statuses
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error: ', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error: ', error.message);
        }

        throw error;
    }

});

const initialState = {
    carsDataArray : [],
    isLoading: false,
    errMsg: ''
};

const carDataSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {

    },
    extraReducers: (builder =>
        builder 
        .addCase(fetchCarData.pending, (state) => {
            state.isLoading = true;
            state.errMsg = '';
        })
        .addCase(fetchCarData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.carsDataArray = action.payload;
        })
        .addCase(fetchCarData.rejected, (state, action) => {
            state.isLoading = false;
            state.errMsg = action.payload;
        })
    )
});

export const CarsDataReducer = carDataSlice.reducer;

export const cars = (state) => {
    return state.cars.carsDataArray;
}