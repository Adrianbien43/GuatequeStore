import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import * as clientePedidoService from "../services/clientePedidoService";

export function useClientPedidos() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    if (!user || !user.id) {
      setError("Usuario no autenticado");
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
      console.error("Error fetchPedidos:", err);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const crearPedido = async (pedido) => {
    if (!user || !user.id) {
      const errorMsg = "Usuario no autenticado. No se puede crear el pedido.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setError(null);
      const pedidoConUsuario = {
        ...pedido,
        usuarioId: user.id,
        fechaPedido: pedido.fechaPedido || new Date().toISOString(),
        estadoPedido: pedido.estadoPedido || "PENDIENTE"
      };
      const data = await clientePedidoService.createPedidoCliente(pedidoConUsuario);
      setPedidos(prevPedidos => [data, ...prevPedidos]);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando pedido";
      setError(msg);
      console.error("Error crearPedido:", err);
      throw err;
    }
  };

  const obtenerPedido = async (id) => {
    try {
      setError(null);
      const data = await clientePedidoService.getPedidoById(id);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error obteniendo pedido";
      setError(msg);
      console.error("Error obtenerPedido:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPedidos();
    }
  }, [user?.id]);

  return { pedidos, loading, error, crearPedido, obtenerPedido, fetchPedidos, setError };
}