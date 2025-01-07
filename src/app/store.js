import { configureStore } from '@reduxjs/toolkit';
import { ServicesReducer } from '../utils/serviceApi';
import { CarsDataReducer } from '../utils/carsAPI';

export const store = configureStore({
  reducer: {
    services: ServicesReducer,
    cars: CarsDataReducer,
  },
});
