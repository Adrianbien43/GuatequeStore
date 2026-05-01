import { useState, useEffect } from "react";
import * as pedidoService from "../services/pedidoService";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pedidoService.getPedidos();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando pedidos";
      setError(msg);
      console.error("Error fetchPedidos:", err);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const addPedido = async (pedido) => {
    try {
      setError(null);
      const data = await pedidoService.createPedido(pedido);
      setPedidos([...pedidos, data]);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando pedido";
      setError(msg);
      console.error("Error addPedido:", err);
      throw err;
    }
  };

  const editPedido = async (id, data) => {
    try {
      setError(null);
      const updated = await pedidoService.updatePedido(id, data);
      setPedidos(pedidos.map(p => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando pedido";
      setError(msg);
      console.error("Error editPedido:", err);
      throw err;
    }
  };

  const removePedido = async (id) => {
    try {
      setError(null);
      await pedidoService.deletePedido(id);
      setPedidos(pedidos.filter(p => p.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando pedido";
      setError(msg);
      console.error("Error removePedido:", err);
      throw err;
    }
  };

  useEffect(() => { fetchPedidos(); }, []);

  return { pedidos, loading, error, addPedido, editPedido, removePedido, setError };
}
