import { useState } from "react";
import { useAlmacenes } from "../hooks/useAlmacenes";
import Table from "../../../../components/reusable/Table";
import styles from './AlmacenesCRUD.module.css';

export default function AlmacenesCRUD() {
  const { almacenes, loading, error, addAlmacen, editAlmacen, removeAlmacen, setError } = useAlmacenes();
  const [form, setForm] = useState({ nombre: "", capacidad: "", direccion: "" });
  const [editing, setEditing] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError("El nombre es requerido");
      return;
    }
    try {
      if (editing) {
        await editAlmacen(editing.id, form);
        setSuccess("Almacén actualizado exitosamente");
      } else {
        await addAlmacen(form);
        setSuccess("Almacén agregado exitosamente");
      }
      setEditing(null);
      setForm({ nombre: "", capacidad: "", direccion: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = a => { 
    setEditing(a);
    setForm({ nombre: a.nombre, capacidad: a.capacidad, direccion: a.direccion });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este almacén?")) {
      try {
        await removeAlmacen(id);
        setSuccess("Almacén eliminado exitosamente");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ nombre: "", capacidad: "", direccion: "" });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'capacidad', label: 'Capacidad' },
    { key: 'direccion', label: 'Dirección' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Almacenes</h2>
          <p>Gestiona los almacenes de la empresa</p>
        </div>
        <button 
          className={styles.btnNew} 
          onClick={() => {
            setEditing(null);
            setForm({ nombre: "", capacidad: "", direccion: "" });
            setError("");
            setSuccess("");
          }}
        >
          + Nuevo Almacén
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            placeholder="Nombre" 
            required 
          />
          <input 
            name="capacidad" 
            value={form.capacidad} 
            onChange={handleChange} 
            type="number" 
            placeholder="Capacidad" 
          />
          <input 
            name="direccion" 
            value={form.direccion} 
            onChange={handleChange} 
            placeholder="Dirección" 
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editing ? "Actualizar Almacén" : "Crear Almacén"}
          </button>
          {editing && (
            <button type="button" className={styles.btnCancel} onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <Table 
        columns={columns}
        data={almacenes}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        loading={loading}
        emptyMessage="No hay almacenes disponibles"
      />
    </div>
  );
}