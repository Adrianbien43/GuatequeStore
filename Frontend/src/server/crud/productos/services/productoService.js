import api from "../../../../api";

const API_URL = "/productos";

export const getProductos = () => api.get(API_URL);

export const createProducto = (producto) => api.post(API_URL, producto);

export const updateProducto = (id, producto) => api.put(`${API_URL}/${id}`, producto);

export const deleteProducto = (id) => api.delete(`${API_URL}/${id}`);