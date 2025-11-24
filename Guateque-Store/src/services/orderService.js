import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const orderService = {
  getAll: async () => {
    try {
      const response = await api.get('/pedidos');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo pedidos');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/pedidos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo pedido');
    }
  },

  create: async (order) => {
    try {
      const response = await api.post('/pedidos', order);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando pedido');
    }
  },

  update: async (id, order) => {
    try {
      const response = await api.put(`/pedidos/${id}`, order);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando pedido');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/pedidos/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando pedido');
    }
  }
};