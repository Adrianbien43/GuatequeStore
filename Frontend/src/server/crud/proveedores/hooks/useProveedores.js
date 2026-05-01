import { useState, useEffect } from "react";
import * as proveedorService from "../services/proveedorService";

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProveedores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await proveedorService.getProveedores();
      setProveedores(Array.isArray(res) ? res : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando proveedores";
      setError(msg);
      console.error("Error fetchProveedores:", err);
      setProveedores([]);
    } finally {
      setLoading(false);
    }
  };

  const addProveedor = async (data) => {
    try {
      setError(null);
      const res = await proveedorService.createProveedor(data);
      setProveedores(prev => [...prev, res]);
      return res;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando proveedor";
      setError(msg);
      console.error("Error addProveedor:", err);
      throw err;
    }
  };

  const editProveedor = async (id, data) => {
    try {
      setError(null);
      const res = await proveedorService.updateProveedor(id, data);
      setProveedores(prev => prev.map(p => p.id === id ? res : p));
      return res;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando proveedor";
      setError(msg);
      console.error("Error editProveedor:", err);
      throw err;
    }
  };

  const removeProveedor = async (id) => {
    try {
      setError(null);
      await proveedorService.deleteProveedor(id);
      setProveedores(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando proveedor";
      setError(msg);
      console.error("Error removeProveedor:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return { proveedores, loading, error, addProveedor, editProveedor, removeProveedor, setError };
};