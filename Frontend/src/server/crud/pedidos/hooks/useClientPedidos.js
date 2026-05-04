// useClientPedidos.js — VERSIÓN SIMPLIFICADA
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import * as clientePedidoService from "../services/clientePedidoService";

export function useClientPedidos() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await clientePedidoService.getPedidosCliente(user.id);
      setPedidos(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando pedidos";
      setError(msg);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const crearPedido = async (pedido) => {
    if (!user?.id) {
      throw new Error("Usuario no autenticado");
    }
    try {
      setError(null);
      const data = await clientePedidoService.createPedidoCliente(pedido);
      setPedidos(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando pedido";
      setError(msg);
      throw err;
    }
  };

  useEffect(() => {
    if (user?.id) fetchPedidos();
  }, [user?.id]);

  return { pedidos, loading, error, crearPedido, fetchPedidos, setError };
}