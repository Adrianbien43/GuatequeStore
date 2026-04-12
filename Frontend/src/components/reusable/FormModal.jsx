import { useState, useEffect } from 'react';
import styles from './FormModal.module.css';

/**
 * FormModal - Modal reutilizable para crear/editar registros
 * 
 * Props:
 * - isOpen: boolean - controla visibilidad del modal
 * - title: string - título del modal
 * - fields: Array<{name: string, label: string, type: string, required: boolean}> - campos del formulario
 * - initialData: Object - datos iniciales (para edición)
 * - onSubmit: function(formData) - callback al enviar el formulario
 * - onClose: function - callback al cerrar el modal
 * - loading: boolean - mostrar estado de carga
 * 
 * Field Types: 'text', 'email', 'number', 'textarea', 'select'
 * 
 * Example:
 * <FormModal
 *   isOpen={isOpen}
 *   title="Nuevo Proveedor"
 *   fields={[
 *     { name: 'nombre', label: 'Nombre', type: 'text', required: true },
 *     { name: 'email', label: 'Email', type: 'email', required: true }
 *   ]}
 *   onSubmit={handleSubmit}
 *   onClose={() => setIsOpen(false)}
 * />
 */
export default function FormModal({
  isOpen,
  title,
  fields,
  initialData = {},
  onSubmit,
  onClose,
  loading = false
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Inicializar formulario cuando modal se abre o initialData cambia
  useEffect(() => {
    if (isOpen) {
      const newData = {};
      fields.forEach(field => {
        newData[field.name] = initialData[field.name] || '';
      });
      setFormData(newData);
      setErrors({});
    }
  }, [isOpen, initialData, fields]);

  // Validar campos requeridos
  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
    });
    return newErrors;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando se empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldsContainer}>
            {fields.map(field => (
              <div key={field.name} className={styles.formGroup}>
                <label htmlFor={field.name} className={styles.label}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                    rows="4"
                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                  >
                    <option value="">Seleccione una opción</option>
                    {field.options && field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  />
                )}

                {errors[field.name] && (
                  <span className={styles.error}>{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
