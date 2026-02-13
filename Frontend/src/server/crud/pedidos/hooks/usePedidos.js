import { useState, useEffect } from "react";
import * as pedidoService from "../services/pedidoService";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const data = await pedidoService.getPedidos();
      setPedidos(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const addPedido = async (pedido) => {
    const data = await pedidoService.createPedido(pedido);
    setPedidos([...pedidos, data]);
  };

  const editPedido = async (id, data) => {
    const updated = await pedidoService.updatePedido(id, data);
    setPedidos(pedidos.map(p => (p.id === id ? updated : p)));
  };

  const removePedido = async (id) => {
    await pedidoService.deletePedido(id);
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  useEffect(() => { fetchPedidos(); }, []);

  return { pedidos, loading, addPedido, editPedido, removePedido };
}
