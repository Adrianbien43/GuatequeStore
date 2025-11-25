import axios from 'axios';

const API_URL = 'http://localhost:8080/api/proveedores';

export const getProveedores = () => axios.get(API_URL);
export const createProveedor = (proveedor) => axios.post(API_URL, proveedor);
export const updateProveedor = (id, proveedor) => axios.put(`${API_URL}/${id}`, proveedor);
export const deleteProveedor = (id) => axios.delete(`${API_URL}/${id}`);