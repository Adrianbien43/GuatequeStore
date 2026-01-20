// src/hooks/useUsuarios.js
import { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService'; // Cambiado

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Cambiado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsuarios = async () => { // Cambiado
    try {
      setLoading(true);
      const data = await usuarioService.getAll(); // Cambiado
      setUsuarios(data); // Cambiado
    } catch (e) {
      setError('Error cargando usuarios: ' + e.message); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  const createUsuario = async (usuario) => { // Cambiado
    try {
      setLoading(true);
      await usuarioService.create(usuario); // Cambiado
      await loadUsuarios();
    } catch (e) {
      setError('Error creando usuario: ' + e.message); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (id) => { // Cambiado
    try {
      setLoading(true);
      await usuarioService.delete(id); // Cambiado
      await loadUsuarios();
    } catch (e) {
      setError('Error eliminando usuario: ' + e.message); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  return {
    usuarios, // Cambiado
    loading,
    error,
    createUsuario, // Cambiado
    deleteUsuario, // Cambiado
  };
};