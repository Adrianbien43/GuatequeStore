import { useState, useEffect } from "react";
import { getProductosCliente, getProductoById } from "../services/clienteProductoService";

export const useClientProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductosCliente();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando productos";
      setError(msg);
      console.error("Error fetchProductos:", err);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductoById = async (id) => {
    try {
      setError(null);
      const data = await getProductoById(id);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando producto";
      setError(msg);
      console.error("Error fetchProductoById:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error, fetchProductos, fetchProductoById, setError };
};
