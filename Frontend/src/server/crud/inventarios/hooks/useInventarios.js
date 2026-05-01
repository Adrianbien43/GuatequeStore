// useInventarios.js - CORREGIDO
import { useState, useEffect } from "react";
import * as inventarioService from "../services/inventarioService";

export function useInventarios() {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventarioService.getInventarios();
      
      // DEBUG: Ver qué llega del backend
      console.log("Respuesta del backend:", data);
      console.log("Es array?", Array.isArray(data));
      
      // El backend devuelve array directo, no {value: [...]}
      const lista = Array.isArray(data) ? data : (data?.value || []);
      setInventarios(lista);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error cargando inventarios";
      setError(msg);
      console.error("Error fetchInventarios:", err);
      setInventarios([]);
    } finally {
      setLoading(false);
    }
  };

  const addInventario = async (inv) => {
    try {
      setError(null);
      const data = await inventarioService.createInventario(inv);
      setInventarios(prev => [...prev, data]);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creando inventario";
      setError(msg);
      console.error("Error addInventario:", err);
      throw err;
    }
  };

  const editInventario = async (almacenId, productoId, inv) => {
    try {
      setError(null);
      const updated = await inventarioService.updateInventario(almacenId, productoId, inv);
      setInventarios(prev => prev.map(i =>
        (i.almacenId === almacenId && i.productoId === productoId) ||
        (i.id?.almacenId === almacenId && i.id?.productoId === productoId)
          ? updated
          : i
      ));
      return updated;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error editando inventario";
      setError(msg);
      console.error("Error editInventario:", err);
      throw err;
    }
  };

  const removeInventario = async (almacenId, productoId) => {
    try {
      setError(null);
      await inventarioService.deleteInventario(almacenId, productoId);
      setInventarios(prev => prev.filter(i => 
        !(i.almacenId === almacenId && i.productoId === productoId) &&
        !(i.id?.almacenId === almacenId && i.id?.productoId === productoId)
      ));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error eliminando inventario";
      setError(msg);
      console.error("Error removeInventario:", err);
      throw err;
    }
  };

  useEffect(() => { fetchInventarios(); }, []);

  return { inventarios, loading, error, addInventario, editInventario, removeInventario, setError };
}