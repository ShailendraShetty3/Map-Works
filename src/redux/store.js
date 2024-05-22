import { configureStore } from '@reduxjs/toolkit';
import checkboxReducer from './reducer';

const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
  },
});

export default store;