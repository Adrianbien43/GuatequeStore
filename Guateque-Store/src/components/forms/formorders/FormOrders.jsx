// Componente principal de gestión de pedidos - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useOrdersManagement } from '../../../hooks/useOrdersManagement';

// Importamos el componente de tabla
import OrdersTable from '../../../components/forms/formorders/OrdersTable';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div style={{ padding: '4rem', textAlign: 'center' }}>
    Cargando pedidos y clientes...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
    {message}
  </div>
);

// Estilos para los elementos de la interfaz
const styles = {
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    height: '48px'
  },
  primaryButton: {
    background: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  secondaryButton: {
    background: '#666',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  }
};

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
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    
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
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Título principal de la página */}
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: '#333' }}>
        Gestión de Pedidos
      </h1>

      {/* Sección del formulario para crear/editar pedidos */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '3rem'
      }}>
        <h2 style={{ marginTop: 0, color: '#1976d2' }}>
          {editingId ? 'Editar Pedido' : 'Nuevo Pedido'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' 
        }}>
          {/* Campo para la fecha del pedido */}
          <div>
            <label><strong>Fecha del Pedido *</strong></label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Campo para seleccionar el estado del pedido */}
          <div>
            <label><strong>Estado</strong></label>
            <select 
              value={orderStatus} 
              onChange={(e) => setOrderStatus(e.target.value)} 
              style={styles.select}
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
          <div>
            <label><strong>Cliente *</strong></label>
            <input
              type="text"
              placeholder="Buscar cliente por nombre o email..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              style={styles.input}
            />
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              style={styles.select}
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
          <div>
            <label><strong>Almacén *</strong></label>
            <select 
              value={warehouseId} 
              onChange={(e) => setWarehouseId(e.target.value)} 
              required 
              style={styles.select}
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
          <div style={{ 
            gridColumn: '1 / -1', 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '1rem' 
          }}>
            <button type="submit" style={styles.primaryButton}>
              {editingId ? 'Actualizar Pedido' : 'Crear Pedido'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm} 
                style={styles.secondaryButton}
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sección de la tabla con todos los pedidos */}
      <h2 style={{ margin: '2rem 0 1rem' }}>
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