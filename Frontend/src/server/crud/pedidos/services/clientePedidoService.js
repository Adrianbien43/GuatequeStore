import api from "../../../../api";

const API_URL = "/pedidos";

// Obtener pedidos del cliente actual (requiere usuarioId)
export const getPedidosCliente = (usuarioId) => {
  console.log("=== getPedidosCliente ===");
  console.log("usuarioId:", usuarioId);
  console.log("Token en localStorage:", localStorage.getItem("token"));
  return api.get(`${API_URL}/cliente/${usuarioId}`).then(res => {
    console.log("Respuesta getPedidosCliente:", res.data);
    return res.data;
  }).catch(err => {
    console.error("Error getPedidosCliente:", err.response?.status, err.response?.data);
    throw err;
  });
};

// Crear un nuevo pedido
export const createPedidoCliente = (data) => {
  console.log("=== createPedidoCliente ===");
  console.log("Datos del pedido a enviar:", data);
  console.log("URL completa:", `${API_URL}`);
  console.log("Token en localStorage:", localStorage.getItem("token"));
  return api.post(API_URL, data).then(res => {
    console.log("Respuesta createPedidoCliente - Status:", res.status);
    console.log("Respuesta createPedidoCliente - Data:", res.data);
    return res.data;
  }).catch(err => {
    console.error("Error createPedidoCliente - Status:", err.response?.status);
    console.error("Error createPedidoCliente - Data:", err.response?.data);
    console.error("Error createPedidoCliente - Headers:", err.response?.headers);
    throw err;
  });
};

// Obtener un pedido específico
export const getPedidoById = (id) => {
  console.log("=== getPedidoById ===");
  console.log("ID:", id);
  return api.get(`${API_URL}/${id}`).then(res => res.data).catch(err => {
    console.error("Error getPedidoById:", err.response?.status, err.response?.data);
    throw err;
  });
};

// Actualizar estado de un pedido (solo para ver si se puede)
export const updatePedido = (id, data) => {
  console.log("=== updatePedido ===");
  console.log("ID:", id);
  console.log("Data:", data);
  return api.put(`${API_URL}/${id}`, data).then(res => res.data).catch(err => {
    console.error("Error updatePedido:", err.response?.status, err.response?.data);
    throw err;
  });
};