import { useState, useEffect } from "react";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../services/clientesService";

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    setLoading(true);
    const data = await getClientes();
    setClientes(data);
    setLoading(false);
  };

  const addCliente = async (cliente) => {
    const nuevo = await createCliente(cliente);
    setClientes(prev => [...prev, nuevo]);
  };

  const editCliente = async (id, cliente) => {
    const actualizado = await updateCliente(id, cliente);
    setClientes(prev => prev.map(c => c.idUsuario === id ? actualizado : c));
  };

  const removeCliente = async (id) => {
    await deleteCliente(id);
    setClientes(prev => prev.filter(c => c.idUsuario !== id));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, addCliente, editCliente, removeCliente, fetchClientes };
};
