// Componente principal de gestión de productos - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useProductsManagement } from '../../../hooks/useProductsManagement';

// Importamos el componente de lista
import ProductsList from './ProductsList';

// Importamos los estilos CSS
import './FormProducts.css';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div className="loading-state">
    Cargando productos y proveedores...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div className="error-state">
    {message}
  </div>
);

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
    event.preventDefault();
    
    // Enviamos los datos del formulario a la función de guardar
    saveProduct();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div className="form-products-container">
      {/* Título principal de la página */}
      <h1 className="form-products-title">
        Gestión de Productos
      </h1>

      {/* Sección del formulario para crear/editar productos */}
      <div className="form-products-section">
        <h2 className="form-products-section-title">
          {editingId ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} className="form-products-form">
          <div className="form-row">
            {/* Campo para el nombre del producto */}
            <div className="form-field">
              <label className="form-label">
                Nombre del Producto *
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={formData.nombre}
                onChange={(e) => updateFormField('nombre', e.target.value)}
                required
                className="form-input"
              />
            </div>

            {/* Campo para la categoría del producto */}
            <div className="form-field">
              <label className="form-label">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => updateFormField('categoria', e.target.value)}
                className="form-select"
              >
                {CATEGORIAS.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            {/* Campo para la talla del producto */}
            <div className="form-field">
              <label className="form-label">
                Talla
              </label>
              <input
                type="text"
                placeholder="Ej: S, M, L, 42, etc."
                value={formData.talla}
                onChange={(e) => updateFormField('talla', e.target.value)}
                className="form-input"
              />
            </div>

            {/* Campo para el precio unitario */}
            <div className="form-field">
              <label className="form-label">
                Precio Unitario *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.precioUnitario}
                onChange={(e) => updateFormField('precioUnitario', e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            {/* Campo para la marca del producto */}
            <div className="form-field">
              <label className="form-label">
                Marca
              </label>
              <input
                type="text"
                placeholder="Marca del producto"
                value={formData.marca}
                onChange={(e) => updateFormField('marca', e.target.value)}
                className="form-input"
              />
            </div>

            {/* Campo para la fecha de fabricación */}
            <div className="form-field">
              <label className="form-label">
                Fecha de Fabricación
              </label>
              <input
                type="date"
                value={formData.fechaFabricacion}
                onChange={(e) => updateFormField('fechaFabricacion', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Campo para seleccionar proveedor */}
          <div className="form-field">
            <label className="form-label">
              Proveedor
            </label>
            <select
              value={formData.proveedor}
              onChange={(e) => updateFormField('proveedor', e.target.value)}
              className="form-select"
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
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Actualizar Producto' : 'Crear Producto'}
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