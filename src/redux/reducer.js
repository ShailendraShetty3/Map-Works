import { createSlice } from '@reduxjs/toolkit';

// Define the slice
export const sewageSlice = createSlice({
  name: 'Checkbox',
  initialState: {
    CheckboxValue: [],  // Use consistent naming convention for state properties
  },
  reducers: {
    updateCheckedValue: (state, action) => {
      state.CheckboxValue = action.payload; // Correct property reference
    },
  },
});

// Export actions
export const { updateCheckedValue } = sewageSlice.actions;

// Export reducer
export default sewageSlice.reducer;
