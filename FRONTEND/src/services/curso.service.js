import axios from 'axios';
import { ToastChakra } from '../helpers/toast';

const API_URL = process.env.REACT_APP_API_URL;

// Get libro

const getAllCursos = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/cursos`, config);
  return response.data;
};

const getCurso = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/cursos/${id}`, config);
  return response.data;
};

const getSeccionesXGrado = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/cursos/grado/${id}`, config);
  return response.data;
};

const getCursosXGrado = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/cursos/grado/${id}`, config);
  return response.data;
};

// Create grado

const createCurso = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.post(`${API_URL}/cursos`, data, config);
  if (response.status === 201 || response.status === 200) {
    ToastChakra(
      'CURSO REGISTRADA',
      'El curso se ha creado correctamente',
      'success',
      1500,
      'bottom'
    );
    return response.data;
  }
};

// Update seccion

const updateCurso = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.put(
    `${API_URL}/cursos/${data._id}`,
    data,
    config
  );
  if (response.status === 200 || response.status === 201) {
    ToastChakra(
      'CURSO MODIFICADO',
      'El curso ha sido modificada correctamente',
      'success',
      1500,
      'bottom'
    );
  }
  return response.data;
};

// Delete grado

const deleteCurso = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.delete(`${API_URL}/cursos/${id}`, config);
  if (response.status === 200 || response.status === 201) {
    ToastChakra(
      'CURSO ELIMINADO',
      'El curso se ha eliminado correctamente',
      'success',
      1500,
      'bottom'
    );
    return response.data;
  }
};

const cursoService = {
  getAllCursos,
  getCurso,
  createCurso,
  updateCurso,
  deleteCurso,
  getSeccionesXGrado,
  getCursosXGrado,
};

export default cursoService;
