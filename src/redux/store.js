import { configureStore } from '@reduxjs/toolkit';
import sewageReducer from './reducer';

const store = configureStore({
  reducer: {
    sewageLayer: sewageReducer,
  },
});

export default store;