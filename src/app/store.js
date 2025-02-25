import { configureStore } from '@reduxjs/toolkit';
import { carReducer } from '../utils/carDetailSlice';
import { serviceScheduleReducer } from '../utils/scheduleSlice';
export const store = configureStore({
  reducer: {
    carDetails: carReducer,
    serviceSchedule: serviceScheduleReducer,
  },
});
