import axios from 'axios';
import { ToastChakra } from '../helpers/toast';

const API_URL = process.env.REACT_APP_API_URL;

// Get libro

const getAllSecciones = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/secciones`, config);
  return response.data;
};

const getSeccion = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/secciones/${id}`, config);
  return response.data;
};

const getSeccionesXGrado = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/secciones/grado/${id}`, config);
  return response.data;
};

// Create grado

const createSeccion = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.post(`${API_URL}/secciones`, data, config);
  if (response.status === 201 || response.status === 200) {
    ToastChakra(
      'SECCION REGISTRADA',
      'La Seccion se ha creado correctamente',
      'success',
      1500,
      'bottom'
    );
    return response.data;
  }
};

// Update seccion

const updateSeccion = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.put(
    `${API_URL}/secciones/${data._id}`,
    data,
    config
  );
  if (response.status === 200 || response.status === 201) {
    ToastChakra(
      'SECCION MODIFICADA',
      'La seccion ha sido modificada correctamente',
      'success',
      1500,
      'bottom'
    );
  }
  return response.data;
};

// Delete grado

const deleteSeccion = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };
  const response = await axios.delete(`${API_URL}/secciones/${id}`, config);
  if (response.status === 200 || response.status === 201) {
    ToastChakra(
      'SECCION ELIMINADA',
      'La seccion se ha eliminado correctamente',
      'success',
      1500,
      'bottom'
    );
    return response.data;
  }
};

const seccionService = {
  getAllSecciones,
  getSeccion,
  createSeccion,
  updateSeccion,
  deleteSeccion,
  getSeccionesXGrado,
};

export default seccionService;
