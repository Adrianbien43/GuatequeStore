import React, { useState } from 'react';
import FormUsuarios from '../../components/forms/formcustomers/FormUsuarios';
import FormProducts from '../../components/forms/formproducts/FormProducts';
import FormSuppliers from '../../components/forms/formsuppliers/FormSuppliers';
import FormWarehouses from '../../components/forms/formwarehouses/FormWarehouses';
import FormOrders from '../../components/forms/formorders/FormOrders';
import './Panel.css';

const Panel = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  const renderForm = () => {
    switch (activeTab) {
      case 'usuarios':
        return <FormUsuarios />;
      case 'products':
        return <FormProducts />;
      case 'suppliers':
        return <FormSuppliers />;
      case 'warehouses':
        return <FormWarehouses />;
      case 'orders':
        return <FormOrders />;
      default:
        return <FormUsuarios />;
    }
  };

  return (

    <section className="panel-section">
      <div className="panel-container">
        <h1>Panel de Administración</h1>
        <div className="panel-tabs">
          <button
            onClick={() => setActiveTab('usuarios')}
            className={activeTab === 'usuarios' ? 'tab-active' : 'tab-inactive'}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'tab-active' : 'tab-inactive'}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={activeTab === 'suppliers' ? 'tab-active' : 'tab-inactive'}
          >
            Proveedores
          </button>
          <button
            onClick={() => setActiveTab('warehouses')}
            className={activeTab === 'warehouses' ? 'tab-active' : 'tab-inactive'}
          >
            Almacenes
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'tab-active' : 'tab-inactive'}
          >
            Pedidos
          </button>
        </div>
        <div className="panel-content">
          {renderForm()}
        </div>
      </div>
    </section>

  );
};

export default Panel;