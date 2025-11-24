import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const supplierService = {
  getAll: async () => {
    try {
      const response = await api.get('/proveedores');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo proveedores');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/proveedores/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo proveedor');
    }
  },

  create: async (supplier) => {
    try {
      const supplierData = {
        nombre: supplier.name,
        direccion: supplier.address
      };
      
      console.log('Creando proveedor:', supplierData);
      const response = await api.post('/proveedores', supplierData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando proveedor');
    }
  },

  update: async (id, supplier) => {
    try {
      const supplierData = {
        nombre: supplier.name,
        direccion: supplier.address
      };
      
      const response = await api.put(`/proveedores/${id}`, supplierData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando proveedor');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/proveedores/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando proveedor');
    }
  },

  getProducts: async (id) => {
    try {
      const response = await api.get(`/proveedores/${id}/productos`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo productos del proveedor');
    }
  }
};