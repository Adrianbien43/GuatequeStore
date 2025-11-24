import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const warehouseService = {
  getAll: async () => {
    try {
      const response = await api.get('/almacenes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo almacenes');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/almacenes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo almacén');
    }
  },

  create: async (warehouse) => {
    try {
      // CORRECCIÓN: Mapear campos frontend -> backend
      const warehouseData = {
        nombre: warehouse.name,        // "name" del frontend -> "nombre" del backend
        capacidad: warehouse.capacity ? parseInt(warehouse.capacity) : null, // convertir a número
        direccion: warehouse.address   // "address" -> "direccion"
      };
      
      console.log('Enviando datos:', warehouseData); // Para debug
      
      const response = await api.post('/almacenes', warehouseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando almacén');
    }
  },

  update: async (id, warehouse) => {
    try {
      // CORRECCIÓN: Mapear campos frontend -> backend
      const warehouseData = {
        nombre: warehouse.name,
        capacidad: warehouse.capacity ? parseInt(warehouse.capacity) : null,
        direccion: warehouse.address
      };
      
      const response = await api.put(`/almacenes/${id}`, warehouseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando almacén');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/almacenes/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando almacén');
    }
  }
};