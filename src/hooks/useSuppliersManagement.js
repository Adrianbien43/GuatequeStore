// Hook personalizado para la gestión de proveedores - Principio de Responsabilidad Única
import { useState, useEffect } from 'react';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../services/supplierService';

export const useSuppliersManagement = () => {
  // Estado para almacenar la lista de todos los proveedores
  const [suppliers, setSuppliers] = useState([]);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error si algo sale mal
  const [error, setError] = useState('');

  // Estados para el formulario de creación/edición de proveedores
  const [name, setName] = useState('');        // Nombre del proveedor
  const [address, setAddress] = useState('');  // Dirección del proveedor

  // Estado para controlar si estamos editando un proveedor existente
  const [editingId, setEditingId] = useState(null);

  // Función principal para cargar todos los proveedores
  const loadSuppliers = async () => {
    try {
      // Activamos el indicador de carga y limpiamos errores anteriores
      setLoading(true);
      setError('');

      // Realizamos la petición para obtener todos los proveedores
      const response = await getProveedores();
      
      // Guardamos los datos en el estado
      setSuppliers(response.data);
    } catch (err) {
      // Si hay un error, lo mostramos en consola y al usuario
      console.error('Error cargando proveedores:', err);
      setError('Error al cargar los proveedores. Por favor, intente nuevamente...');
    } finally {
      // Siempre desactivamos el loading, haya éxito o error
      setLoading(false);
    }
  };

  // Función para limpiar completamente el formulario
  const resetForm = () => {
    setName('');
    setAddress('');
    setEditingId(null);
  };

  // Función para preparar el formulario cuando se va a editar un proveedor existente
  const prepareEdit = (supplier) => {
    setName(supplier.nombre || '');
    setAddress(supplier.direccion || '');
    // Guardamos el ID del proveedor que estamos editando
    setEditingId(supplier.id);
  };

  // Función para guardar un proveedor (tanto crear nuevo como actualizar existente)
  const saveSupplier = async () => {
    // Verificamos que el campo obligatorio (nombre) esté completo
    if (!name) {
      alert('Por favor, complete el nombre del proveedor');
      return;
    }

    // Preparamos los datos en el formato que espera el servidor
    const payload = {
      nombre: name,
      direccion: address || null  // La dirección es opcional
    };

    try {
      // Si estamos editando, actualizamos el proveedor existente
      if (editingId) {
        await updateProveedor(editingId, payload);
      } else {
        // Si no, creamos un nuevo proveedor
        await createProveedor(payload);
      }

      // Limpiamos el formulario y recargamos los datos para ver los cambios
      resetForm();
      await loadSuppliers();
      alert(`Proveedor ${editingId ? 'actualizado' : 'creado'} correctamente`);
    } catch (err) {
      alert('Error al guardar el proveedor');
      console.error(err);
    }
  };

  // Función para eliminar un proveedor existente
  const deleteSupplier = async (supplierId) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (!window.confirm('¿Está seguro de que desea eliminar este proveedor?')) return;

    try {
      await deleteProveedor(supplierId);
      // Recargamos los datos para reflejar los cambios
      await loadSuppliers();
      alert('Proveedor eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar el proveedor');
    }
  };

  // Efecto que se ejecuta al montar el componente para cargar los datos iniciales
  useEffect(() => {
    loadSuppliers();
  }, []);

  // Devolvemos todo el estado y las funciones para que el componente pueda usarlos
  return {
    // Estados de datos
    suppliers,
    loading,
    error,
    
    // Estados del formulario
    name,
    address,
    editingId,
    
    // Funciones para cambiar estados
    setName,
    setAddress,
    setEditingId,
    
    // Funciones de acciones
    loadSuppliers,
    resetForm,
    prepareEdit,
    saveSupplier,
    deleteSupplier
  };
};