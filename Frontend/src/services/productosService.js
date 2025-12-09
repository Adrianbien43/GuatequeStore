import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

export const getProductos = () => axios.get(API_URL);
export const createProducto = (producto) => axios.post(API_URL, producto);
export const updateProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);
export const deleteProducto = (id) => axios.delete(`${API_URL}/${id}`);