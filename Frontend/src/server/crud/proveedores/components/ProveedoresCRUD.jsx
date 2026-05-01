import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";
import styles from './ProveedoresCRUD.module.css';

export default function ProveedoresCRUD() {
  const { proveedores, loading, addProveedor, editProveedor, removeProveedor } = useProveedores();
  const [form, setForm] = useState({ nombre: "", direccion: "" });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      editProveedor(editing.id, form);
      setEditing(null);
    } else {
      addProveedor(form);
    }
    setForm({ nombre: "", direccion: "" });
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({ nombre: p.nombre, direccion: p.direccion });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>CRUD de Proveedores</h2>
          <p>Gestiona los proveedores de la tienda</p>
        </div>
        <button className={styles.btnNew} onClick={() => setEditing({ id: null })}>
          + Nuevo Proveedor
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <ul className={styles.lista}>
          {proveedores.map((p) => (
            <li key={p.id} className={styles.item}>
              <span>{p.nombre} - {p.direccion || "Sin dirección"}</span>
              <div>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => removeProveedor(p.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}