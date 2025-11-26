// Componente principal de gestión de almacenes - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useWarehousesManagement } from '../../../hooks/useWarehousesManagement';

// Importamos el componente de lista
import WarehousesList from '../formwarehouses/WarehousesList';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div style={{ 
    padding: '4rem', 
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#666'
  }}>
    Cargando almacenes...
  </div>
);

// Componente para mostrar mensajes de error
const ErrorState = ({ message }) => (
  <div style={{ 
    padding: '2rem', 
    color: '#dc3545', 
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    borderRadius: '8px',
    margin: '2rem',
    border: '1px solid #f5c6cb'
  }}>
    {message}
  </div>
);

// Estilos para los elementos de la interfaz
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1976d2, #004ba0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    marginBottom: '2.5rem',
    border: '1px solid #e9ecef'
  },
  formTitle: {
    marginTop: 0,
    color: '#1976d2',
    fontSize: '1.6rem',
    marginBottom: '2rem',
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  label: {
    fontWeight: '600',
    color: '#333',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  requiredMarker: {
    color: '#dc3545',
    fontSize: '1.2rem'
  },
  input: {
    padding: '14px',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff'
  },
  requiredField: {
    borderColor: '#1976d2',
    backgroundColor: '#f8fbff'
  },
  optionalField: {
    borderColor: '#e9ecef',
    backgroundColor: '#fafafa'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    justifyContent: 'center'
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    minWidth: '160px',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    minWidth: '160px'
  },
  fieldHint: {
    fontSize: '0.8rem',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '0.25rem'
  }
};

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
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    
    // Enviamos los datos del formulario a la función de guardar
    saveWarehouse();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div style={styles.container}>
      {/* Título principal de la página */}
      <h1 style={styles.title}>Gestión de Almacenes</h1>

      {/* Sección del formulario para crear/editar almacenes */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>
          {editingId ? 'Editar Almacén' : 'Nuevo Almacén'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.formRow}>
            {/* Campo para el nombre del almacén (obligatorio) */}
            <div style={styles.field}>
              <label style={styles.label}>
                Nombre del Almacén <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del almacén"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  ...styles.input,
                  ...styles.requiredField
                }}
                onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                onBlur={(e) => e.target.style.borderColor = '#1976d2'}
              />
              <div style={styles.fieldHint}>
                Campo obligatorio - Identifica el almacén
              </div>
            </div>

            {/* Campo para la capacidad del almacén (opcional) */}
            <div style={styles.field}>
              <label style={styles.label}>
                Capacidad
              </label>
              <input
                type="number"
                placeholder="Capacidad en unidades"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="0"
                style={{
                  ...styles.input,
                  ...styles.optionalField
                }}
                onFocus={(e) => e.target.style.borderColor = '#28a745'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
              <div style={styles.fieldHint}>
                Campo opcional - Capacidad máxima en unidades
              </div>
            </div>
          </div>

          {/* Campo para la dirección del almacén (opcional) */}
          <div style={styles.field}>
            <label style={styles.label}>
              Dirección
            </label>
            <input
              type="text"
              placeholder="Dirección completa del almacén"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                ...styles.input,
                ...styles.optionalField
              }}
              onFocus={(e) => e.target.style.borderColor = '#ffc107'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <div style={styles.fieldHint}>
              Campo opcional - Ubicación física del almacén
            </div>
          </div>

          {/* Botones de acción del formulario */}
          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={styles.primaryButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1565c0';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#1976d2';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
              }}
            >
              {editingId ? 'Actualizar Almacén' : 'Crear Almacén'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm} 
                style={styles.secondaryButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                  e.target.style.transform = 'translateY(0)';
                }}
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