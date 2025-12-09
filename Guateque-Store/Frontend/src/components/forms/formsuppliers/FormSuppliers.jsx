// Componente principal de gestión de proveedores - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useSuppliersManagement } from '../../../hooks/useSuppliersManagement';

// Importamos el componente de lista
import SuppliersList from '../formsuppliers/SuppliersList';

// Importamos los estilos CSS
import './FormSuppliers.css';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div className="loading-state">
    Cargando proveedores...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div className="error-state">
    {message}
  </div>
);

// Componente principal que une toda la funcionalidad
const FormSuppliers = () => {
  // Usamos nuestro hook personalizado que contiene toda la lógica
  const {
    suppliers,
    loading,
    error,
    name,
    address,
    editingId,
    setName,
    setAddress,
    resetForm,
    prepareEdit,
    saveSupplier,
    deleteSupplier
  } = useSuppliersManagement();

  // Función que se ejecuta cuando se envía el formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Enviamos los datos del formulario a la función de guardar
    saveSupplier();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div className="form-suppliers-container">
      {/* Título principal de la página */}
      <h1 className="form-suppliers-title">
        Gestión de Proveedores
      </h1>

      {/* Sección del formulario para crear/editar proveedores */}
      <div className="form-suppliers-section">
        <h2 className="form-suppliers-section-title">
          {editingId ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} className="form-suppliers-form">
          <div className="form-row">
            {/* Campo para el nombre del proveedor (obligatorio) */}
            <div className="form-field">
              <label className="form-label">
                Nombre del Proveedor *
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del proveedor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input required"
              />
              <div className="field-hint">
                Campo obligatorio
              </div>
            </div>

            {/* Campo para la dirección del proveedor (opcional) */}
            <div className="form-field">
              <label className="form-label">
                Dirección
              </label>
              <input
                type="text"
                placeholder="Dirección del proveedor (opcional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input optional"
              />
              <div className="field-hint">
                Campo opcional
              </div>
            </div>
          </div>

          {/* Botones de acción del formulario */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Actualizar Proveedor' : 'Crear Proveedor'}
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

      {/* Sección de la lista con todos los proveedores */}
      <SuppliersList
        suppliers={suppliers}
        onEdit={prepareEdit}
        onDelete={deleteSupplier}
      />
    </div>
  );
};

export default FormSuppliers;