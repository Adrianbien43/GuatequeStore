// Hook personalizado para la gestión de productos - Principio de Responsabilidad Única
import { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productService';
import { getProveedores } from '../services/supplierService';

// Lista de categorías disponibles para los productos (según el nuevo enum)
const CATEGORIAS = ['PANTALON', 'CAMISETA', 'GORRA', 'SUDADERA'];

// Lista de géneros disponibles para los productos
const GENEROS = ['HOMBRE', 'MUJER'];

export const useProductsManagement = () => {
  // Estado para almacenar la lista de todos los productos
  const [products, setProducts] = useState([]);
  // Estado para almacenar la lista de todos los proveedores disponibles
  const [suppliers, setSuppliers] = useState([]);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error si algo sale mal
  const [error, setError] = useState('');

  // Estado para el formulario de creación/edición de productos
  const [formData, setFormData] = useState({
    nombre: '',               // Nombre del producto
    categoria: 'CAMISETA',    // Categoría por defecto (ahora tipo de prenda)
    genero: 'HOMBRE',         // Género por defecto (nuevo campo)
    talla: '',                // Talla del producto
    precioUnitario: '',       // Precio unitario
    marca: '',                // Marca del producto
    fechaFabricacion: '',     // Fecha de fabricación
    proveedor: ''             // ID del proveedor seleccionado
  });

  // Estado para controlar si estamos editando un producto existente
  const [editingId, setEditingId] = useState(null);

  // Función principal para cargar todos los datos necesarios
  const loadData = async () => {
    try {
      // Activamos el indicador de carga y limpiamos errores anteriores
      setLoading(true);
      setError('');

      // Realizamos todas las peticiones a la vez para mayor eficiencia
      const [productsResponse, suppliersResponse] = await Promise.all([
        getProductos(),    // Obtiene todos los productos
        getProveedores()   // Obtiene todos los proveedores
      ]);

      // Guardamos los datos en el estado
      setProducts(productsResponse.data);
      setSuppliers(suppliersResponse.data);
    } catch (err) {
      // Si hay un error, lo mostramos en consola y al usuario
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos. Por favor, intente nuevamente...');
    } finally {
      // Siempre desactivamos el loading, haya éxito o error
      setLoading(false);
    }
  };

  // Función para actualizar un campo específico del formulario
  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para limpiar completamente el formulario
  const resetForm = () => {
    setFormData({
      nombre: '',
      categoria: 'CAMISETA',
      genero: 'HOMBRE',
      talla: '',
      precioUnitario: '',
      marca: '',
      fechaFabricacion: '',
      proveedor: ''
    });
    setEditingId(null);
  };

  // Función para preparar el formulario cuando se va a editar un producto existente
  const prepareEdit = (product) => {
    setFormData({
      nombre: product.nombre || '',
      categoria: product.categoria || 'CAMISETA', // Ahora es tipo de prenda
      genero: product.genero || 'HOMBRE',         // Nuevo campo género
      talla: product.talla || '',
      precioUnitario: product.precioUnitario?.toString() || '',
      marca: product.marca || '',
      fechaFabricacion: product.fechaFabricacion || '',
      proveedor: product.proveedor?.id?.toString() || ''
    });
    // Guardamos el ID del producto que estamos editando
    setEditingId(product.id);
  };

  // Función para guardar un producto (tanto crear nuevo como actualizar existente)
  const saveProduct = async () => {
    // Verificamos que los campos obligatorios estén completos
    if (!formData.nombre || !formData.precioUnitario || !formData.categoria || !formData.genero) {
      alert('Por favor, complete los campos obligatorios (Nombre, Categoría, Género y Precio)');
      return;
    }

    // Preparamos los datos en el formato que espera el servidor
    const payload = {
      nombre: formData.nombre,
      categoria: formData.categoria,    // Ahora es tipo de prenda (PANTALON, CAMISETA, etc.)
      genero: formData.genero,          // Nuevo campo: HOMBRE o MUJER
      talla: formData.talla || null,
      precioUnitario: parseFloat(formData.precioUnitario),
      marca: formData.marca || null,
      fechaFabricacion: formData.fechaFabricacion || null,
      proveedor: formData.proveedor ? { id: parseInt(formData.proveedor) } : null
    };

    try {
      // Si estamos editando, actualizamos el producto existente
      if (editingId) {
        await updateProducto(editingId, payload);
      } else {
        // Si no, creamos un nuevo producto
        await createProducto(payload);
      }

      // Limpiamos el formulario y recargamos los datos para ver los cambios
      resetForm();
      await loadData();
      alert(`Producto ${editingId ? 'actualizado' : 'creado'} correctamente`);
    } catch (err) {
      alert('Error al guardar el producto');
      console.error(err);
    }
  };

  // Función para eliminar un producto existente
  const deleteProduct = async (productId) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (!window.confirm('¿Está seguro de que desea eliminar este producto?')) return;

    try {
      await deleteProducto(productId);
      // Recargamos los datos para reflejar los cambios
      await loadData();
      alert('Producto eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  };

  // Función para filtrar productos por categoría
  const filterByCategoria = (categoria) => {
    return products.filter(product => product.categoria === categoria);
  };

  // Función para filtrar productos por género
  const filterByGenero = (genero) => {
    return products.filter(product => product.genero === genero);
  };

  // Efecto que se ejecuta al montar el componente para cargar los datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Devolvemos todo el estado y las funciones para que el componente pueda usarlos
  return {
    // Estados de datos
    products,
    suppliers,
    loading,
    error,
    
    // Estados del formulario
    formData,
    editingId,
    
    // Constantes
    CATEGORIAS,
    GENEROS,
    
    // Funciones
    updateFormField,
    resetForm,
    prepareEdit,
    saveProduct,
    deleteProduct,
    loadData,
    filterByCategoria,
    filterByGenero
  };
};