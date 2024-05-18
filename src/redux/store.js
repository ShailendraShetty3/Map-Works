import { configureStore } from '@reduxjs/toolkit';
import checkboxReducer from './reducer';

export const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
  },
});



