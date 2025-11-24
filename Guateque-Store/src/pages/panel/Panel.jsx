import React, { useState } from 'react';
import FormCustomers from '../../components/forms/formcustomers/FormCustomers';
import FormProducts from '../../components/forms/formproducts/FormProducts';
import FormSuppliers from '../../components/forms/formsuppliers/FormSuppliers';
import FormWarehouses from '../../components/forms/formwarehouses/FormWarehouses';
import FormOrders from '../../components/forms/formorders/FormOrders';

const Panel = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const renderForm = () => {
    switch (activeTab) {
      case 'customers':
        return <FormCustomers />;
      case 'products':
        return <FormProducts />;
      case 'suppliers':
        return <FormSuppliers />;
      case 'warehouses':
        return <FormWarehouses />;
      case 'orders':
        return <FormOrders />;
      default:
        return <FormCustomers />;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Panel de Administración</h1>
      <div style={{ display: 'flex', marginBottom: '2rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('customers')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'customers' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clientes
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'products' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Productos
        </button>
        <button 
          onClick={() => setActiveTab('suppliers')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'suppliers' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Proveedores
        </button>
        <button 
          onClick={() => setActiveTab('warehouses')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'warehouses' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Almacenes
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'orders' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Pedidos
        </button>
      </div>
      <div>
        {renderForm()}
      </div>
    </div>
  );
};

export default Panel;