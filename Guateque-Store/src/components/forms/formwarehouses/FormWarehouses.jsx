// Componente principal de gestión de almacenes - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useWarehousesManagement } from '../../../hooks/useWarehousesManagement';

// Importamos el componente de lista
import WarehousesList from '../formwarehouses/WarehousesList';

// Importamos los estilos CSS
import './FormWarehouses.css';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div className="loading-state">
    Cargando almacenes...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div className="error-state">
    {message}
  </div>
);

// Componente principal que une toda la funcionalidad
const FormWarehouses = () => {
  // Usamos nuestro hook personalizado que contiene toda la lógica
  const {
    warehouses,
    loading,
    error,
    name,
    capacity,
    address,
    editingId,
    setName,
    setCapacity,
    setAddress,
    resetForm,
    prepareEdit,
    saveWarehouse,
    deleteWarehouse
  } = useWarehousesManagement();

  // Función que se ejecuta cuando se envía el formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Enviamos los datos del formulario a la función de guardar
    saveWarehouse();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div className="form-warehouses-container">
      {/* Título principal de la página */}
      <h1 className="form-warehouses-title">
        Gestión de Almacenes
      </h1>

      {/* Sección del formulario para crear/editar almacenes */}
      <div className="form-warehouses-section">
        <h2 className="form-warehouses-section-title">
          {editingId ? 'Editar Almacén' : 'Nuevo Almacén'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} className="form-warehouses-form">
          <div className="form-row">
            {/* Campo para el nombre del almacén (obligatorio) */}
            <div className="form-field">
              <label className="form-label">
                Nombre del Almacén <span className="required-marker">*</span>
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del almacén"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input required"
              />
              <div className="field-hint">
                Campo obligatorio - Identifica el almacén
              </div>
            </div>

            {/* Campo para la capacidad del almacén (opcional) */}
            <div className="form-field">
              <label className="form-label">
                Capacidad
              </label>
              <input
                type="number"
                placeholder="Capacidad en unidades"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="0"
                className="form-input optional"
              />
              <div className="field-hint">
                Campo opcional - Capacidad máxima en unidades
              </div>
            </div>
          </div>

          {/* Campo para la dirección del almacén (opcional) */}
          <div className="form-field">
            <label className="form-label">
              Dirección
            </label>
            <input
              type="text"
              placeholder="Dirección completa del almacén"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input optional"
            />
            <div className="field-hint">
              Campo opcional - Ubicación física del almacén
            </div>
          </div>

          {/* Botones de acción del formulario */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Actualizar Almacén' : 'Crear Almacén'}
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

      {/* Sección de la lista con todos los almacenes */}
      <WarehousesList
        warehouses={warehouses}
        onEdit={prepareEdit}
        onDelete={deleteWarehouse}
      />
    </div>
  );
};

export default FormWarehouses;