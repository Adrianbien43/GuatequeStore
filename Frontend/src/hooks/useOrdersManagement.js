// Hook personalizado para la gestión de pedidos - Principio de Responsabilidad Única
import { useState, useEffect } from 'react';
import { 
  getPedidos, 
  createPedido, 
  updatePedido, 
  deletePedido 
} from '../services/orderService';
import { customerService } from '../services/customerService';
import { getAlmacenes } from '../services/warehouseService';

export const useOrdersManagement = () => {
  // Estado para almacenar la lista de todos los pedidos
  const [orders, setOrders] = useState([]);
  // Estado para almacenar la lista de todos los clientes disponibles
  const [customers, setCustomers] = useState([]);
  // Estado para almacenar la lista de todos los almacenes
  const [warehouses, setWarehouses] = useState([]);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error si algo sale mal
  const [error, setError] = useState('');

  // Estados para el formulario de creación/edición de pedidos
  const [orderDate, setOrderDate] = useState(''); // Fecha del pedido
  const [orderStatus, setOrderStatus] = useState('PENDIENTE'); // Estado del pedido
  const [customerId, setCustomerId] = useState(''); // ID del cliente seleccionado
  const [warehouseId, setWarehouseId] = useState(''); // ID del almacén seleccionado
  const [editingId, setEditingId] = useState(null); // ID del pedido que se está editando
  const [customerSearch, setCustomerSearch] = useState(''); // Texto para buscar clientes

  // Función principal para cargar todos los datos necesarios
  const loadData = async () => {
    try {
      // Activamos el indicador de carga y limpiamos errores anteriores
      setLoading(true);
      setError('');

      // Realizamos todas las peticiones a la vez para mayor eficiencia
      const [ordersResponse, customersResponse, warehousesResponse] = await Promise.all([
        getPedidos(), // Obtiene todos los pedidos
        customerService.getAll(), // Obtiene todos los clientes
        getAlmacenes() // Obtiene todos los almacenes
      ]);

      // Guardamos los datos en el estado, manejando diferentes formatos de respuesta
      setOrders(ordersResponse.data || ordersResponse);
      setCustomers(customersResponse || []);
      setWarehouses(warehousesResponse.data || warehousesResponse);
    } catch (err) {
      // Si hay un error, lo mostramos en consola y al usuario
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos. Por favor, intente nuevamente...');
    } finally {
      // Siempre desactivamos el loading, haya éxito o error
      setLoading(false);
    }
  };

  // Función para limpiar completamente el formulario
  const resetForm = () => {
    setOrderDate('');
    setOrderStatus('PENDIENTE');
    setCustomerId('');
    setWarehouseId('');
    setEditingId(null);
    setCustomerSearch('');
  };

  // Función para preparar el formulario cuando se va a editar un pedido existente
  const prepareEdit = (order) => {
    // Extraemos solo la parte de la fecha si viene en formato completo
    setOrderDate(order.fechaPedido?.split('T')[0] || '');
    // Establecemos el estado del pedido o uno por defecto
    setOrderStatus(order.estadoPedido || 'PENDIENTE');
    // Convertimos los IDs a string para que funcionen con los inputs
    setCustomerId(order.cliente?.id?.toString() || '');
    setWarehouseId(order.almacen?.id?.toString() || '');
    // Guardamos el ID del pedido que estamos editando
    setEditingId(order.id);
    // Desplazamos la vista al formulario para mayor comodidad
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para guardar un pedido (tanto crear nuevo como actualizar existente)
  const saveOrder = async (orderData) => {
    const { orderDate, orderStatus, customerId, warehouseId, editingId } = orderData;

    // Verificamos que todos los campos obligatorios estén completos
    if (!customerId || !warehouseId || !orderDate) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    // Preparamos los datos en el formato que espera el servidor
    const dataToSend = {
      fechaPedido: orderDate,
      estadoPedido: orderStatus,
      cliente: { id: Number(customerId) },
      almacen: { id: Number(warehouseId) }
    };

    try {
      // Si estamos editando, actualizamos el pedido existente
      if (editingId) {
        await updatePedido(editingId, dataToSend);
      } else {
        // Si no, creamos un nuevo pedido
        await createPedido(dataToSend);
      }

      // Limpiamos el formulario y recargamos los datos para ver los cambios
      resetForm();
      await loadData();
      alert(`Pedido ${editingId ? 'actualizado' : 'creado'} correctamente`);
    } catch (err) {
      alert('Error al guardar el pedido');
      console.error(err);
    }
  };

  // Función para eliminar un pedido existente
  const deleteOrder = async (orderId) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (!window.confirm('¿Está seguro de que desea eliminar este pedido?')) return;

    try {
      await deletePedido(orderId);
      // Recargamos los datos para reflejar los cambios
      await loadData();
      alert('Pedido eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar el pedido');
    }
  };

  // Efecto que se ejecuta al montar el componente para cargar los datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Devolvemos todo el estado y las funciones para que el componente pueda usarlos
  return {
    // Estados de datos
    orders,
    customers,
    warehouses,
    loading,
    error,
    
    // Estados del formulario
    orderDate,
    orderStatus,
    customerId,
    warehouseId,
    editingId,
    customerSearch,
    
    // Funciones para cambiar estados
    setOrderDate,
    setOrderStatus,
    setCustomerId,
    setWarehouseId,
    setEditingId,
    setCustomerSearch,
    
    // Funciones de acciones
    loadData,
    resetForm,
    prepareEdit,
    saveOrder,
    deleteOrder
  };
};