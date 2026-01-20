import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const usuarioService = {
  // Obtener todos los usuarios
  getAll: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo usuarios');
    }
  },

  // Obtener un usuario por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo usuario');
    }
  },

  // Crear un nuevo usuario
  create: async (usuario) => {
    try {
      const response = await api.post('/usuarios', usuario);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando usuario');
    }
  },

  // Actualizar un usuario existente
  update: async (id, usuario) => {
    try {
      const response = await api.put(`/usuarios/${id}`, usuario);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando usuario');
    }
  },

  // Eliminar un usuario por ID
  delete: async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error eliminando usuario');
    }
  },

  // Métodos adicionales que podrías necesitar:
  
  // Buscar usuario por email
  getByEmail: async (email) => {
    try {
      // Si tienes endpoint específico para buscar por email
      const response = await api.get(`/usuarios/email/${email}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error buscando usuario por email');
    }
  },

  // Activar/desactivar usuario
  toggleActivo: async (id, activo) => {
    try {
      const response = await api.patch(`/usuarios/${id}/activo`, { activo });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error cambiando estado del usuario');
    }
  },

  // Cambiar rol de usuario
  cambiarRol: async (id, rol) => {
    try {
      const response = await api.patch(`/usuarios/${id}/rol`, { rol });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error cambiando rol del usuario');
    }
  }
};