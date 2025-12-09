import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Interceptor para errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const customerService = {
  getAll: async () => {
    try {
      const response = await api.get('/clientes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo clientes');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo cliente');
    }
  },

  create: async (customer) => {
    try {
      const response = await api.post('/clientes', customer);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando cliente');
    }
  },

  update: async (id, customer) => {
    try {
      const response = await api.put(`/clientes/${id}`, customer);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando cliente');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando cliente');
    }
  }
};