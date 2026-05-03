import api from "../../../../api";

const API_URL = "/productos";

// Obtener todos los productos disponibles para clientes
export const getProductosCliente = () => api.get(API_URL).then(res => res.data);

// Obtener un producto específico por ID
export const getProductoById = (id) => api.get(`${API_URL}/${id}`).then(res => res.data);
