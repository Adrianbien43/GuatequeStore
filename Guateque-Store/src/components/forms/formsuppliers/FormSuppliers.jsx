// Componente principal de gestión de proveedores - Coordina todos los elementos
import React from 'react';

// Importamos nuestro hook personalizado para manejar la lógica de negocio
import { useSuppliersManagement } from '../../../hooks/useSuppliersManagement';

// Importamos el componente de lista
import SuppliersList from '../formsuppliers/SuppliersList';

// Componente para mostrar cuando los datos están cargando
const LoadingState = () => (
  <div style={{ padding: '4rem', textAlign: 'center' }}>
    Cargando proveedores...
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
    fontSize: '1.5rem',
    marginBottom: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
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
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease'
  },
  requiredField: {
    borderColor: '#1976d2'
  },
  optionalField: {
    borderColor: '#ccc'
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
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  fieldHint: {
    fontSize: '0.8rem',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '0.25rem'
  }
};

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
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    
    // Enviamos los datos del formulario a la función de guardar
    saveSupplier();
  };

  // Si está cargando, mostramos el componente de carga
  if (loading) return <LoadingState />;
  
  // Si hay error, mostramos el componente de error
  if (error) return <ErrorState message={error} />;

  // Renderizamos la interfaz completa
  return (
    <div style={styles.container}>
      {/* Título principal de la página */}
      <h1 style={styles.title}>Gestión de Proveedores</h1>

      {/* Sección del formulario para crear/editar proveedores */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>
          {editingId ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </h2>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.formRow}>
            {/* Campo para el nombre del proveedor (obligatorio) */}
            <div style={styles.field}>
              <label style={styles.label}>
                Nombre del Proveedor *
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del proveedor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  ...styles.input,
                  ...styles.requiredField
                }}
              />
              <div style={styles.fieldHint}>
                Campo obligatorio
              </div>
            </div>

            {/* Campo para la dirección del proveedor (opcional) */}
            <div style={styles.field}>
              <label style={styles.label}>
                Dirección
              </label>
              <input
                type="text"
                placeholder="Dirección del proveedor (opcional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  ...styles.input,
                  ...styles.optionalField
                }}
              />
              <div style={styles.fieldHint}>
                Campo opcional
              </div>
            </div>
          </div>

          {/* Botones de acción del formulario */}
          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={styles.primaryButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
            >
              {editingId ? 'Actualizar Proveedor' : 'Crear Proveedor'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm} 
                style={styles.secondaryButton}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
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