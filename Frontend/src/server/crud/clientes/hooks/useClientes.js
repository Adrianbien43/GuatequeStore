import { useState, useEffect } from "react";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../services/clientesService";

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClientes();
      setClientes(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando clientes";
      setError(msg);
      console.error("Error fetchClientes:", err);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  const addCliente = async (cliente) => {
    try {
      setError(null);
      const nuevo = await createCliente(cliente);
      setClientes(prev => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando cliente";
      setError(msg);
      console.error("Error addCliente:", err);
      throw err;
    }
  };

  const editCliente = async (id, cliente) => {
    try {
      setError(null);
      const actualizado = await updateCliente(id, cliente);
      setClientes(prev => prev.map(c => c.idUsuario === id ? actualizado : c));
      return actualizado;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando cliente";
      setError(msg);
      console.error("Error editCliente:", err);
      throw err;
    }
  };

  const removeCliente = async (id) => {
    try {
      setError(null);
      await deleteCliente(id);
      setClientes(prev => prev.filter(c => c.idUsuario !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando cliente";
      setError(msg);
      console.error("Error removeCliente:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, error, addCliente, editCliente, removeCliente, fetchClientes, setError };
};
