import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";
import Table from "../../../../components/reusable/Table";
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

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'direccion', label: 'Dirección' }
  ];

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

      <Table 
        columns={columns}
        data={proveedores}
        onEdit={handleEdit}
        onDelete={(row) => removeProveedor(row.id)}
        loading={loading}
        emptyMessage="No hay proveedores disponibles"
      />
    </div>
  );
}