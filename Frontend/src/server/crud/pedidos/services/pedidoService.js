import api from "../../../../api";

const API_URL = "/pedidos";

export const getPedidos = () => api.get(API_URL).then(res => res.data);
export const createPedido = (data) => api.post(API_URL, data).then(res => res.data);
export const updatePedido = (id, data) => api.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deletePedido = (id) => api.delete(`${API_URL}/${id}`);