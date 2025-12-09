// src/hooks/useCustomers.js
import { useState, useEffect } from 'react';
import { customerService } from '../services/customerService';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (e) {
      setError('Error cargando clientes: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer) => {
    try {
      setLoading(true);
      await customerService.create(customer);
      await loadCustomers();
    } catch (e) {
      setError('Error creando cliente: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      await customerService.delete(id);
      await loadCustomers();
    } catch (e) {
      setError('Error eliminando cliente: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    createCustomer,
    deleteCustomer,
  };
};
