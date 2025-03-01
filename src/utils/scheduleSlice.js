import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const setSchedule = createAsyncThunk(
  'serviceSchedule/setServiceSchedule',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
      return { id: docRef.id, ...appointmentData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const serviceScheduleSlice = createSlice({
  name: 'serviceSchedule',
  initialState: {
    service: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    carProfile: '',
    time: '',
    date: '',
    loading: false, 
    error: null,    
    appointmentId: null 
  },
  reducers: {
    setService: (state, action) => {
      state.service = action.payload; 
    },
    setCustomerInfo: (state, action) => {
      
      const { firstName, lastName, email, phone, carMake, carModel, carYear, carProfile } = action.payload;
      state.firstName = firstName || state.firstName;
      state.lastName = lastName || state.lastName;
      state.email = email || state.email;
      state.phone = phone || state.phone;
      state.carMake = carMake || state.carMake;
      state.carModel = carModel || state.carModel;
      state.carYear = carYear || state.carYear;
      state.carProfile = carProfile || state.carProfile;
    },
    setDateTime: (state, action) => {
      // Updates date and time
      const { date, time } = action.payload;
      state.date = date || state.date;
      state.time = time || state.time;
    },
    clearSchedule: (state) => {
      // Resets state
      state.service = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.carMake = '';
      state.carModel = '';
      state.carYear = '';
      state.carProfile = '';
      state.time = '';
      state.date = '';
      state.loading = false;
      state.error = null;
      state.appointmentId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentId = action.payload.id;
       
        Object.assign(state, action.payload);
      })
      .addCase(setSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setService, setCustomerInfo, setDateTime, clearSchedule } = serviceScheduleSlice.actions;
export const serviceScheduleReducer =  serviceScheduleSlice.reducer;