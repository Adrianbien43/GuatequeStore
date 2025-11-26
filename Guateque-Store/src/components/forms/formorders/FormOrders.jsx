// Componente principal de gestión de pedidos - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useOrdersManagement } from '../../../hooks/useOrdersManagement';

// Importamos el componente de tabla
import OrdersTable from '../../../components/forms/formorders/OrdersTable';

// Importamos los estilos CSS
import './FormOrders.css';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div className="loading-state">
    Cargando pedidos y clientes...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div className="error-state">
    {message}
  </div>
);

// Componente principal que une toda la funcionalidad
const FormOrders = () => {
  // Usamos nuestro hook personalizado que contiene toda la lógica
  const {
    orders,
    customers,
    warehouses,
    loading,
    error,
    orderDate,
    orderStatus,
    customerId,
    warehouseId,
    editingId,
    customerSearch,
    setOrderDate,
    setOrderStatus,
    setCustomerId,
    setWarehouseId,
    setCustomerSearch,
    resetForm,
    prepareEdit,
    saveOrder,
    deleteOrder
  } = useOrdersManagement();

  // Función que se ejecuta cuando se envía el formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Enviamos los datos del formulario a la función de guardar
    saveOrder({
      orderDate,
      orderStatus,
      customerId,
      warehouseId,
      editingId
    });
  };

  // Filtramos los clientes según el texto de búsqueda
  const filteredCustomers = customers.filter(customer =>
    customer.nombre?.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div className="form-orders-container">
      {/* Título principal de la página */}
      <h1 className="form-orders-title">
        Gestión de Pedidos
      </h1>

      {/* Sección del formulario para crear/editar pedidos */}
      <div className="form-orders-section">
        <h2 className="form-orders-section-title">
          {editingId ? 'Editar Pedido' : 'Nuevo Pedido'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} className="form-orders-form">
          {/* Campo para la fecha del pedido */}
          <div className="form-field">
            <label className="form-label">
              <strong>Fecha del Pedido *</strong>
            </label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
              className="form-input"
            />
          </div>

          {/* Campo para seleccionar el estado del pedido */}
          <div className="form-field">
            <label className="form-label">
              <strong>Estado</strong>
            </label>
            <select 
              value={orderStatus} 
              onChange={(e) => setOrderStatus(e.target.value)} 
              className="form-select"
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="CONFIRMADO">Confirmado</option>
              <option value="EN_PREPARACION">En Preparación</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>

          {/* Campo para buscar y seleccionar cliente */}
          <div className="form-field">
            <label className="form-label">
              <strong>Cliente *</strong>
            </label>
            <input
              type="text"
              placeholder="Buscar cliente por nombre o email..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="form-input"
            />
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Selecciona un cliente</option>
              {filteredCustomers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.nombre} {customer.apellido && `- ${customer.apellido}`} ({customer.email})
                </option>
              ))}
            </select>
          </div>

          {/* Campo para seleccionar almacén */}
          <div className="form-field">
            <label className="form-label">
              <strong>Almacén *</strong>
            </label>
            <select 
              value={warehouseId} 
              onChange={(e) => setWarehouseId(e.target.value)} 
              required 
              className="form-select"
            >
              <option value="">Selecciona almacén</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.nombre} - {warehouse.direccion || warehouse.ciudad}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción del formulario */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Actualizar Pedido' : 'Crear Pedido'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm} 
                className="btn-secondary"
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sección de la tabla con todos los pedidos */}
      <h2 className="orders-list-title">
        Lista de Pedidos ({orders.length})
      </h2>

      {/* Componente de tabla que muestra todos los pedidos */}
      <OrdersTable
        orders={orders}
        onEdit={prepareEdit}
        onDelete={deleteOrder}
      />
    </div>
  );
};

export default FormOrders;