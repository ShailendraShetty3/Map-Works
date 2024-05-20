import { createSlice } from '@reduxjs/toolkit';

// Define the slice
export const sewageSlice = createSlice({
  name: 'sewageLayer',
  initialState: {
    sewageValue: [],  // Use consistent naming convention for state properties
  },
  reducers: {
    updateSewageValue: (state, action) => {
      state.sewageValue = action.payload; // Correct property reference
    },
  },
});

// Export actions
export const { updateSewageValue } = sewageSlice.actions;

// Export reducer
export default sewageSlice.reducer;

