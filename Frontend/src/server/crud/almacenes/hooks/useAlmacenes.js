import { useState, useEffect } from "react";
import * as almacenService from "../services/almacenService";

export function useAlmacenes() {
  const [almacenes, setAlmacenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlmacenes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await almacenService.getAlmacenes();
      setAlmacenes(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando almacenes";
      setError(msg);
      console.error("Error fetchAlmacenes:", err);
      setAlmacenes([]);
    } finally {
      setLoading(false);
    }
  };

  const addAlmacen = async (almacen) => {
    try {
      setError(null);
      const data = await almacenService.createAlmacen(almacen);
      setAlmacenes([...almacenes, data]);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando almacén";
      setError(msg);
      console.error("Error addAlmacen:", err);
      throw err;
    }
  };

  const editAlmacen = async (id, data) => {
    try {
      setError(null);
      const updated = await almacenService.updateAlmacen(id, data);
      setAlmacenes(almacenes.map(a => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando almacén";
      setError(msg);
      console.error("Error editAlmacen:", err);
      throw err;
    }
  };

  const removeAlmacen = async (id) => {
    try {
      setError(null);
      await almacenService.deleteAlmacen(id);
      setAlmacenes(almacenes.filter(a => a.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando almacén";
      setError(msg);
      console.error("Error removeAlmacen:", err);
      throw err;
    }
  };

  useEffect(() => { fetchAlmacenes(); }, []);

  return { almacenes, loading, error, addAlmacen, editAlmacen, removeAlmacen, setError };
}
