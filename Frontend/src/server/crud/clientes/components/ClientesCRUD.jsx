import { useState } from "react";
import { useClientes } from "../hooks/useClientes";
import Table from "../../../../components/reusable/Table";
import styles from './ClientesCRUD.module.css';

export default function ClientesCRUD() {
  const { clientes, loading, error, addCliente, editCliente, removeCliente, setError } = useClientes();
  const [form, setForm] = useState({ nombre: "", email: "", direccion: "" });
  const [editingId, setEditingId] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) {
      setError("Nombre y email son requeridos");
      return;
    }
    try {
      if (editingId) {
        await editCliente(editingId, form);
        setSuccess("Cliente actualizado exitosamente");
      } else {
        await addCliente(form);
        setSuccess("Cliente agregado exitosamente");
      }
      setEditingId(null);
      setForm({ nombre: "", email: "", direccion: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = cliente => {
    setEditingId(cliente.idUsuario);
    setForm({ nombre: cliente.nombre, email: cliente.email, direccion: cliente.direccion });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await removeCliente(id);
        setSuccess("Cliente eliminado exitosamente");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ nombre: "", email: "", direccion: "" });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'idUsuario', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'direccion', label: 'Dirección' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Clientes</h2>
          <p>Gestiona los clientes de la tienda</p>
        </div>
        <button 
          className={styles.btnNew} 
          onClick={() => {
            setEditingId(null);
            setForm({ nombre: "", email: "", direccion: "" });
            setError("");
            setSuccess("");
          }}
        >
          + Nuevo Cliente
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input 
            name="nombre" 
            placeholder="Nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            type="email"
            required 
          />
          <input 
            name="direccion" 
            placeholder="Dirección" 
            value={form.direccion} 
            onChange={handleChange} 
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editingId ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
          {editingId && (
            <button type="button" className={styles.btnCancel} onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <Table
        columns={columns}
        data={clientes}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.idUsuario)}
        loading={loading}
        emptyMessage="No hay clientes disponibles"
      />
    </div>
  );
}