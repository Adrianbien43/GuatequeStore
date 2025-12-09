// Hook personalizado para la gestión de almacenes - Principio de Responsabilidad Única
import { useState, useEffect } from 'react';
import { getAlmacenes, createAlmacen, updateAlmacen, deleteAlmacen } from '../services/warehouseService';

export const useWarehousesManagement = () => {
  // Estado para almacenar la lista de todos los almacenes
  const [warehouses, setWarehouses] = useState([]);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error si algo sale mal
  const [error, setError] = useState('');

  // Estados para el formulario de creación/edición de almacenes
  const [name, setName] = useState('');           // Nombre del almacén
  const [capacity, setCapacity] = useState('');   // Capacidad del almacén
  const [address, setAddress] = useState('');     // Dirección del almacén

  // Estado para controlar si estamos editando un almacén existente
  const [editingId, setEditingId] = useState(null);

  // Función principal para cargar todos los almacenes
  const loadWarehouses = async () => {
    try {
      // Activamos el indicador de carga y limpiamos errores anteriores
      setLoading(true);
      setError('');

      // Realizamos la petición para obtener todos los almacenes
      const response = await getAlmacenes();
      
      // Guardamos los datos en el estado
      setWarehouses(response.data);
    } catch (err) {
      // Si hay un error, lo mostramos en consola y al usuario
      console.error('Error cargando almacenes:', err);
      setError('Error al cargar los almacenes. Por favor, intente nuevamente...');
    } finally {
      // Siempre desactivamos el loading, haya éxito o error
      setLoading(false);
    }
  };

  // Función para limpiar completamente el formulario
  const resetForm = () => {
    setName('');
    setCapacity('');
    setAddress('');
    setEditingId(null);
  };

  // Función para preparar el formulario cuando se va a editar un almacén existente
  const prepareEdit = (warehouse) => {
    setName(warehouse.nombre || '');
    setCapacity(warehouse.capacidad?.toString() || '');
    setAddress(warehouse.direccion || '');
    // Guardamos el ID del almacén que estamos editando
    setEditingId(warehouse.id);
  };

  // Función para guardar un almacén (tanto crear nuevo como actualizar existente)
  const saveWarehouse = async () => {
    // Verificamos que el campo obligatorio (nombre) esté completo
    if (!name.trim()) {
      alert('Por favor, complete el nombre del almacén');
      return;
    }

    // Preparamos los datos en el formato que espera el servidor
    const payload = {
      nombre: name.trim(),
      capacidad: capacity ? Number(capacity) : null,
      direccion: address.trim() || null
    };

    try {
      // Si estamos editando, actualizamos el almacén existente
      if (editingId) {
        await updateAlmacen(editingId, payload);
      } else {
        // Si no, creamos un nuevo almacén
        await createAlmacen(payload);
      }

      // Limpiamos el formulario y recargamos los datos para ver los cambios
      resetForm();
      await loadWarehouses();
      alert(`Almacén ${editingId ? 'actualizado' : 'creado'} correctamente`);
    } catch (err) {
      alert('Error al guardar el almacén');
      console.error(err);
    }
  };

  // Función para eliminar un almacén existente
  const deleteWarehouse = async (warehouseId) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (!window.confirm('¿Está seguro de que desea eliminar este almacén?')) return;

    try {
      await deleteAlmacen(warehouseId);
      // Recargamos los datos para reflejar los cambios
      await loadWarehouses();
      alert('Almacén eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar el almacén');
    }
  };

  // Efecto que se ejecuta al montar el componente para cargar los datos iniciales
  useEffect(() => {
    loadWarehouses();
  }, []);

  // Devolvemos todo el estado y las funciones para que el componente pueda usarlos
  return {
    // Estados de datos
    warehouses,
    loading,
    error,
    
    // Estados del formulario
    name,
    capacity,
    address,
    editingId,
    
    // Funciones para cambiar estados
    setName,
    setCapacity,
    setAddress,
    setEditingId,
    
    // Funciones de acciones
    loadWarehouses,
    resetForm,
    prepareEdit,
    saveWarehouse,
    deleteWarehouse
  };
};