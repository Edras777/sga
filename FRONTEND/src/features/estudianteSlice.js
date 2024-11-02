import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import estudianteService from '../services/estudiante.service';

const initialState = {
  estudiantes: [],
  estudiante: [],
  calificaciones: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createEstudiante = createAsyncThunk(
  'estudiantes/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.createEstudiante(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCalificacion = createAsyncThunk(
  'calificaciones/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.createCalificacion(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEstudiantes = createAsyncThunk(
  'estudiantes/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.getAllEstudiantes(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEstudiante = createAsyncThunk(
  'estudiante/get',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.getEstudiante(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCalificacionByStudent = createAsyncThunk(
  'calificacion/get_by_student',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.getCalificacionByEstudiante(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEstudianteByCUI = createAsyncThunk(
  'estudiante/CUI/get',
  async (cui, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.getEstudianteByCUI(cui, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEstudiante = createAsyncThunk(
  'estudiantes/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.updateEstudiante(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEstudiante = createAsyncThunk(
  'estudiantes/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await estudianteService.deleteEstudiante(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const estudianteSlice = createSlice({
  name: 'estudiantes_ceba',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getEstudiantes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEstudiantes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.estudiantes = action.payload;
      })
      .addCase(getEstudiantes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEstudiante.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEstudiante.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.estudiante = action.payload;
      })
      .addCase(getEstudiante.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createEstudiante.pending, state => {
        state.isLoading = true;
      })
      .addCase(createEstudiante.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.estudiantes.push(action.payload);
      })
      .addCase(createEstudiante.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEstudiante.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteEstudiante.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.estudiantes = state.estudiantes.filter(
          student => student._id !== action.payload._id
        );
      })
      .addCase(deleteEstudiante.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEstudiante.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateEstudiante.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.estudiantes = state.estudiantes.map(student =>
          student._id === action.payload._id ? action.payload : student
        );
      })
      .addCase(updateEstudiante.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCalificacionByStudent.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCalificacionByStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.calificaciones = action.payload;
      })
      .addCase(getCalificacionByStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCalificacion.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCalificacion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.calificaciones.push(action.payload);
      })
      .addCase(createCalificacion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = estudianteSlice.actions;
export default estudianteSlice.reducer;
