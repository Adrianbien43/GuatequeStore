// src/services/warehouseService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getAlmacenes = () => axios.get(`${API_URL}/almacenes`);
export const createAlmacen = (datos) => axios.post(`${API_URL}/almacenes`, datos);
export const updateAlmacen = (id, datos) => axios.put(`${API_URL}/almacenes/${id}`, datos);
export const deleteAlmacen = (id) => axios.delete(`${API_URL}/almacenes/${id}`);