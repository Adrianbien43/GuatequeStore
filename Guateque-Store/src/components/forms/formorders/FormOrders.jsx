import React, { useState, useEffect } from 'react';
import { orderService } from '../../../services/orderService';
import { customerService } from '../../../services/customerService';
import { warehouseService } from '../../../services/warehouseService';

const FormOrders = () => {
  const [order, setOrder] = useState({
    orderDate: '',
    orderStatus: 'PENDING',
    customer: null,
    warehouse: null
  });
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    loadCustomers();
    loadWarehouses();
  }, []);

  const loadCustomers = async () => {
    try {
      const customersData = await customerService.getAll();
      setCustomers(customersData);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    }
  };

  const loadWarehouses = async () => {
    try {
      const warehousesData = await warehouseService.getAll();
      setWarehouses(warehousesData);
    } catch (error) {
      console.error('Error cargando almacenes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.create(order);
      alert('Pedido creado exitosamente');
      setOrder({
        orderDate: '',
        orderStatus: 'PENDING',
        customer: null,
        warehouse: null
      });
    } catch (error) {
      alert('Error creando pedido: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h3>Gestión de Pedidos</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Fecha Pedido:</label>
        <input
          type="date"
          name="orderDate"
          value={order.orderDate}
          onChange={handleChange}
          required
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Estado Pedido:</label>
        <select 
          name="orderStatus" 
          value={order.orderStatus} 
          onChange={handleChange}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        >
          <option value="PENDING">Pendiente</option>
          <option value="CONFIRMED">Confirmado</option>
          <option value="IN_PREPARATION">En preparación</option>
          <option value="SENT">Enviado</option>
          <option value="DELIVERED">Entregado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Cliente:</label>
        <select 
          onChange={(e) => setOrder({...order, customer: {id: e.target.value}})}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        >
          <option value="">Seleccionar cliente</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Almacén:</label>
        <select 
          onChange={(e) => setOrder({...order, warehouse: {id: e.target.value}})}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        >
          <option value="">Seleccionar almacén</option>
          {warehouses.map(warehouse => (
            <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        style={{ 
          padding: '0.75rem 1.5rem', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Crear Pedido
      </button>
    </form>
  );
};

export default FormOrders;