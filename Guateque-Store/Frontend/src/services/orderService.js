import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedidos';

export const getPedidos = () => axios.get(API_URL);
export const createPedido = (pedido) => axios.post(API_URL, pedido);
export const updatePedido = (id, pedido) => axios.put(`${API_URL}/${id}`, pedido);
export const deletePedido = (id) => axios.delete(`${API_URL}/${id}`);