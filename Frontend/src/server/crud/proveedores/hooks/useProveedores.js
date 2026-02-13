import { useState, useEffect } from "react";
import * as proveedorService from "../services/proveedorService";

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const res = await proveedorService.getProveedores();
      setProveedores(res.data);
    } catch (err) {
      console.error("Error cargando proveedores:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProveedor = async (data) => {
    try {
      await proveedorService.createProveedor(data);
      fetchProveedores();
    } catch (err) {
      console.error("Error creando proveedor:", err.message);
    }
  };

  const editProveedor = async (id, data) => {
    try {
      await proveedorService.updateProveedor(id, data);
      fetchProveedores();
    } catch (err) {
      console.error("Error editando proveedor:", err.message);
    }
  };

  const removeProveedor = async (id) => {
    try {
      await proveedorService.deleteProveedor(id);
      fetchProveedores();
    } catch (err) {
      console.error("Error eliminando proveedor:", err.message);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return { proveedores, loading, addProveedor, editProveedor, removeProveedor };
};