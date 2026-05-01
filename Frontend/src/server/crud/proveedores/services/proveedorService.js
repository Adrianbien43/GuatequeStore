import api from "../../../../api";

const API_URL = "/proveedores";

export const getProveedores = () => api.get(API_URL).then(res => res.data);
export const createProveedor = (data) => api.post(API_URL, data).then(res => res.data);
export const updateProveedor = (id, data) => api.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteProveedor = (id) => api.delete(`${API_URL}/${id}`);
