import api from "../../../../api";

const API_URL = "/almacenes";

export const getAlmacenes = () => api.get(API_URL).then(res => res.data);
export const createAlmacen = (data) => api.post(API_URL, data).then(res => res.data);
export const updateAlmacen = (id, data) => api.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteAlmacen = (id) => api.delete(`${API_URL}/${id}`);