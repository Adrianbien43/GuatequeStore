import { useState, useEffect } from "react";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../services/productoService";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos();
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

  const addProducto = async (producto) => {
    try {
      setError(null);
      const nuevo = await createProducto(producto);
      setProductos(prev => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando producto";
      setError(msg);
      console.error("Error addProducto:", err);
      throw err;
    }
  };

  const editProducto = async (id, producto) => {
    try {
      setError(null);
      const actualizado = await updateProducto(id, producto);
      setProductos(prev => prev.map(p => p.id === id ? actualizado : p));
      return actualizado;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando producto";
      setError(msg);
      console.error("Error editProducto:", err);
      throw err;
    }
  };

  const removeProducto = async (id) => {
    try {
      setError(null);
      await deleteProducto(id);
      setProductos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando producto";
      setError(msg);
      console.error("Error removeProducto:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error, addProducto, editProducto, removeProducto, fetchProductos, setError };
};
