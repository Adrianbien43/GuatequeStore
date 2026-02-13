import api from "../../../../api";

const API_URL = "/inventario";

export const getInventarios = () => api.get(API_URL).then(res => res.data);
export const createInventario = (data) => api.post(API_URL, data).then(res => res.data);
export const updateInventario = (almacenId, productoId, data) =>
  api.put(`${API_URL}/almacen/${almacenId}/producto/${productoId}`, data).then(res => res.data);
export const deleteInventario = (almacenId, productoId) =>
  api.delete(`${API_URL}/almacen/${almacenId}/producto/${productoId}`);