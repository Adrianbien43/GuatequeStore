import { useState, useEffect } from "react";
import * as almacenService from "../services/almacenService";

export function useAlmacenes() {
  const [almacenes, setAlmacenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlmacenes = async () => {
    setLoading(true);
    try {
      const data = await almacenService.getAlmacenes();
      setAlmacenes(data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const addAlmacen = async (almacen) => {
    const data = await almacenService.createAlmacen(almacen);
    setAlmacenes([...almacenes, data]);
  };

  const editAlmacen = async (id, data) => {
    const updated = await almacenService.updateAlmacen(id, data);
    setAlmacenes(almacenes.map(a => (a.id === id ? updated : a)));
  };

  const removeAlmacen = async (id) => {
    await almacenService.deleteAlmacen(id);
    setAlmacenes(almacenes.filter(a => a.id !== id));
  };

  useEffect(() => { fetchAlmacenes(); }, []);

  return { almacenes, loading, addAlmacen, editAlmacen, removeAlmacen };
}
