import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
