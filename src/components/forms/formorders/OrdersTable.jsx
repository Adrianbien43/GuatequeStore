// Componente para mostrar la tabla de pedidos - Principio de Responsabilidad Única
import React from 'react';

// Función para obtener el color según el estado del pedido
const getStatusColor = (status) => {
  // Definimos colores específicos para cada estado posible
  const statusColors = {
    ENTREGADO: '#4caf50',    // Verde para pedidos entregados
    CANCELADO: '#f44336',    // Rojo para pedidos cancelados
    PENDIENTE: '#ff9800',    // Naranja para pedidos pendientes
    ENVIADO: '#2196f3',      // Azul para pedidos enviados
    CONFIRMADO: '#2196f3',   // Azul para pedidos confirmados
    EN_PREPARACION: '#ff9800' // Naranja para pedidos en preparación
  };
  // Devolvemos el color correspondiente o gris por defecto
  return statusColors[status] || '#666';
};

// Función para formatear el estado del pedido para mostrarlo mejor
const formatStatus = (status) => {
  // Si no hay estado, devolvemos cadena vacía
  if (!status) return '';
  
  // Reemplazamos guiones bajos por espacios y ponemos en formato título
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Componente para cada fila individual de la tabla
const OrderRow = ({ order, onEdit, onDelete }) => {
  return (
    <tr style={styles.row}>
      {/* Celda para mostrar la fecha del pedido */}
      <td style={styles.cell}>
        {order.fechaPedido?.split('T')[0] || 'Sin fecha'}
      </td>
      
      {/* Celda para el estado con color según el estado actual */}
      <td style={{ 
        ...styles.cell, 
        fontWeight: '600', 
        color: getStatusColor(order.estadoPedido) 
      }}>
        {formatStatus(order.estadoPedido)}
      </td>
      
      {/* Celda para la información del cliente */}
      <td style={styles.cell}>
        {order.cliente?.nombre} {order.cliente?.apellido} <br />
        <small style={{ color: '#666' }}>{order.cliente?.email}</small>
      </td>
      
      {/* Celda para la información del almacén */}
      <td style={styles.cell}>
        {order.almacen?.nombre || 'N/A'}
      </td>
      
      {/* Celda para los botones de acciones */}
      <td style={{ ...styles.cell, textAlign: 'center' }}>
        <button 
          onClick={() => onEdit(order)} 
          style={styles.editButton}
          title="Editar este pedido"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(order.id)} 
          style={styles.deleteButton}
          title="Eliminar este pedido"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

// Componente principal de la tabla
const OrdersTable = ({ orders, onEdit, onDelete }) => {
  // Si no hay pedidos, mostramos un mensaje amigable
  if (orders.length === 0) {
    return (
      <p style={styles.noOrders}>
        No hay pedidos registrados aún.
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.header}>
          <tr>
            <th style={styles.headerCell}>Fecha</th>
            <th style={styles.headerCell}>Estado</th>
            <th style={styles.headerCell}>Cliente</th>
            <th style={styles.headerCell}>Almacén</th>
            <th style={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Creamos una fila por cada pedido en la lista */}
          {orders.map(order => (
            <OrderRow 
              key={order.id} 
              order={order} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos organizados para mantener consistencia en la apariencia
const styles = {
  container: {
    overflowX: 'auto' // Permite scroll horizontal en pantallas pequeñas
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse', // Elimina espacios entre celdas
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden', // Para que el border-radius funcione
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)' // Sombra suave
  },
  header: {
    background: '#1976d2', // Azul para el encabezado
    color: 'white'
  },
  headerCell: {
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    textTransform: 'uppercase', // Texto en mayúsculas
    fontSize: '0.9rem'
  },
  row: {
    borderBottom: '1px solid #eee' // Línea separadora entre filas
  },
  cell: {
    padding: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  },
  editButton: {
    background: '#4caf50', // Verde para editar
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    marginRight: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  deleteButton: {
    background: '#f44336', // Rojo para eliminar
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  noOrders: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    padding: '2rem'
  }
};

export default OrdersTable;