import React, { useState, useEffect } from "react";
import { customerService } from "../../../services/customerService";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import styles from "./FormCustomers.module.css";

const FormCustomers = () => {
  const [customer, setCustomer] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (e) {
      setError("Error cargando clientes " );
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async () => {
    try {
      setLoading(true);
      await customerService.create(customer);
      await loadCustomers();
    } catch (e) {
      setError("Error creando cliente " );
    } finally {
      setLoading(false);
    }
  };

  const removeCustomer = async (id) => {
    try {
      setLoading(true);
      await customerService.delete(id);
      await loadCustomers();
    } catch (e) {
      setError("Error eliminando cliente " );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer();
    setCustomer({ nombre: "", email: "", password: "", direccion: "" });
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Eliminar a "${nombre}"?`)) {
      removeCustomer(id);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Gestión de Clientes</h3>

      {error && <div className={styles.error}>{error}</div>}

      <CustomerForm
        customer={customer}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        styles={styles}
      />

      <CustomerList
        customers={customers}
        loading={loading}
        onDelete={handleDelete}
        styles={styles}
      />
    </div>
  );
};

export default FormCustomers;
