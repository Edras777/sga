import axios from 'axios';
// import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get reportes modalidad EBR
const getReportes = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  };

  const response = await axios.get(`${baseURL}/reportes/`, config);
  return response.data;
};

const reporteService = {
  getReportes,
};

export default reporteService;
