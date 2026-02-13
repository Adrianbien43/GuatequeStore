import api from "../../../../api";

const API_URL = "/usuarios";

export const getClientes = () =>
  api.get(API_URL)
     .then(res => res.data)
     .then(data => data.filter(u => u.rol === "CLIENTE")); // solo clientes

export const createCliente = (cliente) => api.post(API_URL, cliente).then(res => res.data);
export const updateCliente = (id, cliente) => api.put(`${API_URL}/${id}`, cliente).then(res => res.data);
export const deleteCliente = (id) => api.delete(`${API_URL}/${id}`);