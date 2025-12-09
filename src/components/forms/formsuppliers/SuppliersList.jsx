// Componente para mostrar la lista de proveedores - Principio de Responsabilidad Única
import React from 'react';

// Componente para cada elemento individual de la lista
const SupplierItem = ({ supplier, onEdit, onDelete }) => {
  return (
    <li style={styles.listItem}>
      {/* Información del proveedor */}
      <div style={styles.supplierInfo}>
        <strong style={styles.supplierName}>{supplier.nombre}</strong>
        {supplier.direccion && (
          <div style={styles.supplierAddress}>
            📍 {supplier.direccion}
          </div>
        )}
      </div>
      
      {/* Botones de acciones */}
      <div style={styles.actions}>
        <button 
          onClick={() => onEdit(supplier)} 
          style={styles.editButton}
          title="Editar este proveedor"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(supplier.id)} 
          style={styles.deleteButton}
          title="Eliminar este proveedor"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

// Componente principal de la lista
const SuppliersList = ({ suppliers, onEdit, onDelete }) => {
  // Si no hay proveedores, mostramos un mensaje amigable
  if (suppliers.length === 0) {
    return (
      <div style={styles.noSuppliers}>
        <p>No hay proveedores registrados aún.</p>
        <p style={styles.hint}>Comienza agregando tu primer proveedor usando el formulario superior.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Lista de Proveedores ({suppliers.length})</h3>
      <ul style={styles.list}>
        {/* Creamos un elemento por cada proveedor en la lista */}
        {suppliers.map(supplier => (
          <SupplierItem 
            key={supplier.id} 
            supplier={supplier} 
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
    padding: '1rem',
    marginBottom: '0.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    transition: 'background-color 0.2s ease'
  },
  supplierInfo: {
    flex: 1
  },
  supplierName: {
    fontSize: '1.1rem',
    color: '#333',
    display: 'block',
    marginBottom: '0.25rem'
  },
  supplierAddress: {
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease'
  },
  noSuppliers: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px dashed #dee2e6'
  },
  hint: {
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    color: '#999'
  }
};

// Efectos hover para mejor experiencia de usuario
styles.listItem[':hover'] = {
  backgroundColor: '#e9ecef'
};

styles.editButton[':hover'] = {
  backgroundColor: '#218838'
};

styles.deleteButton[':hover'] = {
  backgroundColor: '#c82333'
};

export default SuppliersList;