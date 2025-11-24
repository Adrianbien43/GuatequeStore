import React, { useState, useEffect } from 'react';
import { productService } from '../../../services/productService';
import { supplierService } from '../../../services/supplierService';

const FormProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    category: 'HOMBRE',
    size: '',
    price: '',
    brand: '',
    manufactureDate: '',
    supplierId: ''
  });
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const data = await supplierService.getAll();
      setSuppliers(data);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await productService.create(product);
      setMessage('✅ Producto creado exitosamente');
      setProduct({
        name: '',
        category: 'HOMBRE',
        size: '',
        price: '',
        brand: '',
        manufactureDate: '',
        supplierId: ''
      });
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
      console.error('Error detallado:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h3>Gestión de Productos</h3>
      
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Nombre: *
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Nombre del producto"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Categoría: *
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          <option value="HOMBRE">Hombre</option>
          <option value="MUJER">Mujer</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Talla:
        </label>
        <input
          type="text"
          name="size"
          value={product.size}
          onChange={handleChange}
          disabled={loading}
          placeholder="Talla (ej: M, L, XL)"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Precio: *
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="0.00"
          step="0.01"
          min="0"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Marca:
        </label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          disabled={loading}
          placeholder="Marca del producto"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Fecha Fabricación:
        </label>
        <input
          type="date"
          name="manufactureDate"
          value={product.manufactureDate}
          onChange={handleChange}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Proveedor (Opcional):
        </label>
        <select
          name="supplierId"
          value={product.supplierId}
          onChange={handleChange}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          <option value="">Seleccione un proveedor</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.nombre}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="submit"
        disabled={loading || !product.name.trim() || !product.price}
        style={{ 
          width: '100%',
          padding: '0.75rem', 
          background: (loading || !product.name.trim() || !product.price) ? '#6c757d' : '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: (loading || !product.name.trim() || !product.price) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? '⏳ Creando...' : '🛍️ Crear Producto'}
      </button>
    </form>
  );
};

export default FormProducts;