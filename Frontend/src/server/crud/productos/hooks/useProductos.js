import { useState, useEffect } from "react";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../services/productoService";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  const addProducto = async (producto) => {
    const nuevo = await createProducto(producto);
    setProductos(prev => [...prev, nuevo]);
  };

  const editProducto = async (id, producto) => {
    const actualizado = await updateProducto(id, producto);
    setProductos(prev => prev.map(p => p.idProducto === id ? actualizado : p));
  };

  const removeProducto = async (id) => {
    await deleteProducto(id);
    setProductos(prev => prev.filter(p => p.idProducto !== id));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, addProducto, editProducto, removeProducto, fetchProductos };
};
