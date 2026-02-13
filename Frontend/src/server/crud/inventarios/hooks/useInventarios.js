import { useState, useEffect } from "react";
import * as inventarioService from "../services/inventarioService";

export function useInventarios() {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventarios = async () => {
    setLoading(true);
    try {
      const data = await inventarioService.getInventarios();
      setInventarios(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const addInventario = async (inv) => {
    const data = await inventarioService.createInventario(inv);
    setInventarios([...inventarios, data]);
  };

  const editInventario = async (almacenId, productoId, inv) => {
    const updated = await inventarioService.updateInventario(almacenId, productoId, inv);
    setInventarios(inventarios.map(i =>
      i.almacenId === almacenId && i.productoId === productoId ? updated : i
    ));
  };

  const removeInventario = async (almacenId, productoId) => {
    await inventarioService.deleteInventario(almacenId, productoId);
    setInventarios(inventarios.filter(i => !(i.almacenId === almacenId && i.productoId === productoId)));
  };

  useEffect(() => { fetchInventarios(); }, []);

  return { inventarios, loading, addInventario, editInventario, removeInventario };
}
