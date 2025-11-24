import React, { useState } from 'react';
import { supplierService } from '../../../services/supplierService';

const FormSuppliers = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await supplierService.create(supplier);
      setMessage('✅ Proveedor creado exitosamente');
      setSupplier({ name: '', address: '' });
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
      console.error('Error detallado:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h3>Gestión de Proveedores</h3>
      
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
          value={supplier.name}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Ingrese el nombre del proveedor"
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
          Dirección:
        </label>
        <input
          type="text"
          name="address"
          value={supplier.address}
          onChange={handleChange}
          disabled={loading}
          placeholder="Dirección del proveedor"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <button 
        type="submit"
        disabled={loading || !supplier.name.trim()}
        style={{ 
          width: '100%',
          padding: '0.75rem', 
          background: (loading || !supplier.name.trim()) ? '#6c757d' : '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: (loading || !supplier.name.trim()) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? '⏳ Creando...' : '🏭 Crear Proveedor'}
      </button>
    </form>
  );
};

export default FormSuppliers;