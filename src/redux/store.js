import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './slices';

const store = configureStore({
  reducer: {
    mealReducer,
  },
});

export default store;

// This is where I have integrated reducer to store.
