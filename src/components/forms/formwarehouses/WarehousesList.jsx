// Componente para mostrar la lista de almacenes - Principio de Responsabilidad Única
import React from 'react';

// Componente para cada elemento individual de la lista
const WarehouseItem = ({ warehouse, onEdit, onDelete }) => {
  return (
    <li style={styles.listItem}>
      {/* Información del almacén */}
      <div style={styles.warehouseInfo}>
        <strong style={styles.warehouseName}>{warehouse.nombre}</strong>
        <div style={styles.warehouseDetails}>
          {warehouse.capacidad && (
            <span style={styles.capacity}>
              📦 Capacidad: {warehouse.capacidad} unidades
            </span>
          )}
          {warehouse.direccion && (
            <span style={styles.address}>
              📍 {warehouse.direccion}
            </span>
          )}
        </div>
      </div>
      
      {/* Botones de acciones */}
      <div style={styles.actions}>
        <button 
          onClick={() => onEdit(warehouse)} 
          style={styles.editButton}
          title="Editar este almacén"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(warehouse.id)} 
          style={styles.deleteButton}
          title="Eliminar este almacén"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

// Componente principal de la lista
const WarehousesList = ({ warehouses, onEdit, onDelete }) => {
  // Si no hay almacenes, mostramos un mensaje amigable
  if (warehouses.length === 0) {
    return (
      <div style={styles.noWarehouses}>
        <p>No hay almacenes registrados aún.</p>
        <p style={styles.hint}>Comienza agregando tu primer almacén usando el formulario superior.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Lista de Almacenes ({warehouses.length})</h3>
      <ul style={styles.list}>
        {/* Creamos un elemento por cada almacén en la lista */}
        {warehouses.map(warehouse => (
          <WarehouseItem 
            key={warehouse.id} 
            warehouse={warehouse} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

// Estilos organizados para mantener consistencia en la apariencia
const styles = {
  container: {
    marginTop: '2rem',
    padding: '1rem'
  },
  title: {
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    marginBottom: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  warehouseInfo: {
    flex: 1
  },
  warehouseName: {
    fontSize: '1.2rem',
    color: '#333',
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600'
  },
  warehouseDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  capacity: {
    fontSize: '0.95rem',
    color: '#1976d2',
    fontWeight: '500'
  },
  address: {
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem'
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  noWarehouses: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '2px dashed #dee2e6'
  },
  hint: {
    fontSize: '0.9rem',
    marginTop: '0.75rem',
    color: '#999'
  }
};

// Efectos hover para mejor experiencia de usuario
styles.listItem[':hover'] = {
  backgroundColor: '#e9ecef',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
};

styles.editButton[':hover'] = {
  backgroundColor: '#218838',
  transform: 'scale(1.05)'
};

styles.deleteButton[':hover'] = {
  backgroundColor: '#c82333',
  transform: 'scale(1.05)'
};

export default WarehousesList;