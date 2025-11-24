import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const productService = {
  getAll: async () => {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo productos');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo producto');
    }
  },

  create: async (product) => {
    try {
      const productData = {
        nombre: product.name,
        categoria: product.category,
        talla: product.size,
        precioUnitario: product.price,
        marca: product.brand,
        fechaFabricacion: product.manufactureDate,
        proveedor: product.supplierId ? { id: product.supplierId } : null
      };
      
      console.log('Creando producto:', productData);
      const response = await api.post('/productos', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando producto');
    }
  },

  update: async (id, product) => {
    try {
      const productData = {
        nombre: product.name,
        categoria: product.category,
        talla: product.size,
        precioUnitario: product.price,
        marca: product.brand,
        fechaFabricacion: product.manufactureDate,
        proveedor: product.supplierId ? { id: product.supplierId } : null
      };
      
      const response = await api.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando producto');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando producto');
    }
  }
};