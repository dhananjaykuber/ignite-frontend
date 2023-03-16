import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAdminInformation = createAsyncThunk(
  'admin/getAdminInformation',
  () => {
    return localStorage.getItem('admin');
  }
);

const initialState = {
  data: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.data = action.payload.toString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInformation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAdminInformation.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
