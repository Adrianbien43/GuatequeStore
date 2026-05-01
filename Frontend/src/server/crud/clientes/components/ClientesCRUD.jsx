import { useState } from "react";
import { useClientes } from "../hooks/useClientes";
import styles from './ClientesCRUD.module.css';

export default function ClientesCRUD() {
  const { clientes, loading, addCliente, editCliente, removeCliente } = useClientes();
  const [form, setForm] = useState({ nombre: "", email: "", direccion: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await editCliente(editingId, form);
      setEditingId(null);
    } else {
      await addCliente(form);
    }
    setForm({ nombre: "", email: "", direccion: "" });
  };

  const handleEdit = cliente => {
    setEditingId(cliente.idUsuario);
    setForm({ nombre: cliente.nombre, email: cliente.email, direccion: cliente.direccion });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Clientes</h2>
          <p>Gestiona los clientes de la tienda</p>
        </div>
        <button className={styles.btnNew} onClick={() => setEditingId(null)}>
          + Nuevo Cliente
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        </div>
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      {loading ? <p className={styles.loading}>Cargando...</p> : (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.idUsuario}>
                <td>{c.idUsuario}</td>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.direccion}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Editar</button>
                  <button onClick={() => removeCliente(c.idUsuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}