import { configureStore } from '@reduxjs/toolkit';
import { ServicesReducer } from '../utils/serviceApi';

export const store = configureStore({
  reducer: {
    services: ServicesReducer,
  },
});
