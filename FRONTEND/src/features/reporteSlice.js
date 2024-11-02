import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reporteService from '../services/reporte.service';

const initialState = {
  reportes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getReportes = createAsyncThunk(
  'reportes/',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await reporteService.getReportes(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getReportes.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getReportes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.reportes = action.payload;
    });
    builder.addCase(getReportes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = reportesSlice.actions;

export default reportesSlice.reducer;
