// Componente para mostrar la lista de productos - Principio de Responsabilidad Única
import React from 'react';

// Componente para cada elemento individual de la lista
const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li style={styles.listItem}>
      {/* Información principal del producto */}
      <div style={styles.productInfo}>
        <strong>{product.nombre}</strong> - {product.categoria} - ${product.precioUnitario}
        {product.proveedor && ` - ${product.proveedor.nombre}`}
        
        {/* Información adicional si está disponible */}
        {(product.marca || product.talla) && (
          <div style={styles.additionalInfo}>
            {product.marca && <span>Marca: {product.marca}</span>}
            {product.talla && <span>Talla: {product.talla}</span>}
            {product.fechaFabricacion && (
              <span>Fabricación: {new Date(product.fechaFabricacion).toLocaleDateString()}</span>
            )}
          </div>
        )}
      </div>
      
      {/* Botones de acciones */}
      <div style={styles.actions}>
        <button 
          onClick={() => onEdit(product)} 
          style={styles.editButton}
          title="Editar este producto"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(product.id)} 
          style={styles.deleteButton}
          title="Eliminar este producto"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

// Componente principal de la lista
const ProductsList = ({ products, onEdit, onDelete }) => {
  // Si no hay productos, mostramos un mensaje amigable
  if (products.length === 0) {
    return (
      <div style={styles.noProducts}>
        <p>No hay productos registrados aún.</p>
        <p style={styles.hint}>Comienza agregando tu primer producto usando el formulario superior.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Lista de Productos ({products.length})</h3>
      <ul style={styles.list}>
        {/* Creamos un elemento por cada producto en la lista */}
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
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
    border: '1px solid #e9ecef'
  },
  productInfo: {
    flex: 1
  },
  additionalInfo: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#666',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
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
    fontSize: '0.9rem'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  noProducts: {
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

export default ProductsList;