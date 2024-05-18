import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedListSewage: [],
  checkedListStorm: [],
  checkedListBuilding: [],
};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    setCheckedListSewage: (state, action) => {
      state.checkedListSewage = action.payload;
    },
    setCheckedListStorm: (state, action) => {
      state.checkedListStorm = action.payload;
    },
    setCheckedListBuilding: (state, action) => {
      state.checkedListBuilding = action.payload;
    },
  },
});

export const {
  setCheckedListSewage,
  setCheckedListStorm,
  setCheckedListBuilding,
} = checkboxSlice.actions;

export default checkboxSlice.reducer;
