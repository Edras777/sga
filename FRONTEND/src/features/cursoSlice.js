import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import cursoService from '../services/curso.service';

const initialState = {
  cursos: [],
  cursosGrado: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createCurso = createAsyncThunk(
  'curso/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log('data', data);
      return await cursoService.createCurso(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCursos = createAsyncThunk(
  'cursos/getCursos',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cursoService.getAllCursos(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCursosXGrado = createAsyncThunk(
  'cursos/getCursosXGrado',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cursoService.getCursosXGrado(id, token);
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
      return await cursoService.getSeccionesXGrado(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCurso = createAsyncThunk(
  'curso/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cursoService.updateCurso(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCurso = createAsyncThunk(
  'cursos/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cursoService.deleteCurso(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cursoSlice = createSlice({
  name: 'cursos',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getCursos.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCursos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cursos = action.payload;
      })
      .addCase(getCursos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCursosXGrado.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCursosXGrado.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cursosGrado = action.payload;
      })
      .addCase(getCursosXGrado.rejected, (state, action) => {
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
        state.cursos = action.payload;
      })
      .addCase(getSeccionesXGrado.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCurso.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCurso.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cursos.push(action.payload);
      })
      .addCase(createCurso.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCurso.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCurso.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cursos = state.cursos.filter(
          curso => curso._id !== action.payload._id
        );
      })
      .addCase(deleteCurso.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCurso.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCurso.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cursos = state.cursos.map(curso =>
          curso._id === action.payload._id ? action.payload : curso
        );
      })
      .addCase(updateCurso.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cursoSlice.actions;
export default cursoSlice.reducer;
