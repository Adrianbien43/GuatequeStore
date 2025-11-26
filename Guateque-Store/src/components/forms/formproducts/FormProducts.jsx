// Componente principal de gestión de productos - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useProductsManagement } from '../../../hooks/useProductsManagement';

// Importamos el componente de lista
import ProductsList from '../../forms/formproducts/ProductsList';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div style={{ padding: '4rem', textAlign: 'center' }}>
    Cargando productos y proveedores...
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
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  formTitle: {
    marginTop: 0,
    color: '#1976d2',
    fontSize: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '0.9rem'
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  select: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
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
const FormProducts = () => {
  // Usamos nuestro hook personalizado que contiene toda la lógica
  const {
    products,
    suppliers,
    loading,
    error,
    formData,
    editingId,
    CATEGORIAS,
    updateFormField,
    resetForm,
    prepareEdit,
    saveProduct,
    deleteProduct
  } = useProductsManagement();

  // Función que se ejecuta cuando se envía el formulario
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    
    // Enviamos los datos del formulario a la función de guardar
    saveProduct();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div style={styles.container}>
      {/* Título principal de la página */}
      <h1 style={styles.title}>Gestión de Productos</h1>

      {/* Sección del formulario para crear/editar productos */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>
          {editingId ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.formRow}>
            {/* Campo para el nombre del producto */}
            <div style={styles.field}>
              <label style={styles.label}>Nombre del Producto *</label>
              <input
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={formData.nombre}
                onChange={(e) => updateFormField('nombre', e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {/* Campo para la categoría del producto */}
            <div style={styles.field}>
              <label style={styles.label}>Categoría</label>
              <select
                value={formData.categoria}
                onChange={(e) => updateFormField('categoria', e.target.value)}
                style={styles.select}
              >
                {CATEGORIAS.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            {/* Campo para la talla del producto */}
            <div style={styles.field}>
              <label style={styles.label}>Talla</label>
              <input
                type="text"
                placeholder="Ej: S, M, L, 42, etc."
                value={formData.talla}
                onChange={(e) => updateFormField('talla', e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Campo para el precio unitario */}
            <div style={styles.field}>
              <label style={styles.label}>Precio Unitario *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.precioUnitario}
                onChange={(e) => updateFormField('precioUnitario', e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            {/* Campo para la marca del producto */}
            <div style={styles.field}>
              <label style={styles.label}>Marca</label>
              <input
                type="text"
                placeholder="Marca del producto"
                value={formData.marca}
                onChange={(e) => updateFormField('marca', e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Campo para la fecha de fabricación */}
            <div style={styles.field}>
              <label style={styles.label}>Fecha de Fabricación</label>
              <input
                type="date"
                value={formData.fechaFabricacion}
                onChange={(e) => updateFormField('fechaFabricacion', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Campo para seleccionar proveedor */}
          <div style={styles.field}>
            <label style={styles.label}>Proveedor</label>
            <select
              value={formData.proveedor}
              onChange={(e) => updateFormField('proveedor', e.target.value)}
              style={styles.select}
            >
              <option value="">Sin proveedor</option>
              {suppliers.map(proveedor => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción del formulario */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              {editingId ? 'Actualizar Producto' : 'Crear Producto'}
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

      {/* Sección de la lista con todos los productos */}
      <ProductsList
        products={products}
        onEdit={prepareEdit}
        onDelete={deleteProduct}
      />
    </div>
  );
};

export default FormProducts;