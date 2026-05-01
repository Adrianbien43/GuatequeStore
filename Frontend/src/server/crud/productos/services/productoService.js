import api from "../../../../api";

const API_URL = "/productos";

export const getProductos = () => api.get(API_URL).then(res => res.data);

export const createProducto = (producto) => api.post(API_URL, producto).then(res => res.data);

export const updateProducto = (id, producto) => api.put(`${API_URL}/${id}`, producto).then(res => res.data);

export const deleteProducto = (id) => api.delete(`${API_URL}/${id}`);