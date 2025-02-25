import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const tireSelectionSlice = createSlice({
    name: 'tireSelection',
    initialState: {
        carYear: [],
        carMake: [],
        carModel: [],
        profile: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCarYear: (state, action) => {
            state.carYear = action.payload;
        },
        
    }
})

