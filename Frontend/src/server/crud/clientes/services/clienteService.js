/**
 * clienteService.js
 * Servicio de API para operaciones CRUD de clientes
 * 
 * Endpoints:
 * - GET /clientes - Obtener todos los clientes
 * - POST /clientes - Crear nuevo cliente
 * - PUT /clientes/:id - Actualizar cliente
 * - DELETE /clientes/:id - Eliminar cliente
 */

import api from '../../../../api';

const API_URL = '/clientes';

/**
 * Obtener todos los clientes
 * @returns {Promise} Respuesta con lista de clientes
 */
export const getClientes = () => api.get(API_URL);

/**
 * Crear nuevo cliente
 * @param {Object} data - Datos del cliente (nombre, email, telefono, etc)
 * @returns {Promise} Respuesta con cliente creado
 */
export const createCliente = (data) => api.post(API_URL, data);

/**
 * Actualizar cliente existente
 * @param {number} id - ID del cliente
 * @param {Object} data - Datos a actualizar
 * @returns {Promise} Respuesta con cliente actualizado
 */
export const updateCliente = (id, data) => api.put(`${API_URL}/${id}`, data);

/**
 * Eliminar cliente
 * @param {number} id - ID del cliente
 * @returns {Promise} Respuesta de eliminación
 */
export const deleteCliente = (id) => api.delete(`${API_URL}/${id}`);
