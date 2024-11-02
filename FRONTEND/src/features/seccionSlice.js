import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import seccionService from '../services/seccion.service';

const initialState = {
  secciones: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createSeccion = createAsyncThunk(
  'seccion/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log('data', data);
      return await seccionService.createSeccion(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSecciones = createAsyncThunk(
  'secciones/getSecciones',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await seccionService.getAllSecciones(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSeccionesXGrado = createAsyncThunk(
  'secciones/getSeccionesXGrado',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await seccionService.getSeccionesXGrado(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSeccion = createAsyncThunk(
  'seccion/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await seccionService.updateSeccion(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSeccion = createAsyncThunk(
  'secciones/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await seccionService.deleteSeccion(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const seccionSlice = createSlice({
  name: 'secciones',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getSecciones.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSecciones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secciones = action.payload;
      })
      .addCase(getSecciones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSeccionesXGrado.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSeccionesXGrado.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secciones = action.payload;
      })
      .addCase(getSeccionesXGrado.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSeccion.pending, state => {
        state.isLoading = true;
      })
      .addCase(createSeccion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secciones.push(action.payload);
      })
      .addCase(createSeccion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSeccion.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteSeccion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secciones = state.secciones.filter(
          seccion => seccion._id !== action.payload._id
        );
      })
      .addCase(deleteSeccion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSeccion.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateSeccion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.secciones = state.secciones.map(seccion =>
          seccion._id === action.payload._id ? action.payload : seccion
        );
      })
      .addCase(updateSeccion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = seccionSlice.actions;
export default seccionSlice.reducer;
