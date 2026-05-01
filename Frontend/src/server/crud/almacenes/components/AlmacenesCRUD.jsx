import { useState } from "react";
import { useAlmacenes } from "../hooks/useAlmacenes";
import Table from "../../../../components/reusable/Table";
import styles from './AlmacenesCRUD.module.css';

export default function AlmacenesCRUD() {
  const { almacenes, loading, addAlmacen, editAlmacen, removeAlmacen } = useAlmacenes();
  const [form, setForm] = useState({ nombre: "", capacidad: "", direccion: "" });
  const [editing, setEditing] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) { editAlmacen(editing.id, form); setEditing(null); }
    else addAlmacen(form);
    setForm({ nombre: "", capacidad: "", direccion: "" });
  };

  const handleEdit = a => { setEditing(a); setForm({ nombre: a.nombre, capacidad: a.capacidad, direccion: a.direccion }); };

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'capacidad', label: 'Capacidad' },
    { key: 'direccion', label: 'Dirección' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>CRUD Almacenes</h2>
          <p>Gestiona los almacenes de la empresa</p>
        </div>
        <button className={styles.btnNew} onClick={() => setEditing({ id: null })}>
          + Nuevo Almacén
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="capacidad" value={form.capacidad} onChange={handleChange} type="number" placeholder="Capacidad" />
          <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      <Table 
        columns={columns}
        data={almacenes}
        onEdit={handleEdit}
        onDelete={(row) => removeAlmacen(row.id)}
        loading={loading}
        emptyMessage="No hay almacenes disponibles"
      />
    </div>
  );
}