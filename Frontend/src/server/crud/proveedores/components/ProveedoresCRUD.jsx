import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";
import Table from "../../../../components/reusable/Table";
import styles from './ProveedoresCRUD.module.css';

export default function ProveedoresCRUD() {
  const { proveedores, loading, error, addProveedor, editProveedor, removeProveedor, setError } = useProveedores();
  const [form, setForm] = useState({ nombre: "", direccion: "" });
  const [editing, setEditing] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError("El nombre es requerido");
      return;
    }
    try {
      if (editing) {
        await editProveedor(editing.id, form);
        setSuccess("Proveedor actualizado exitosamente");
      } else {
        await addProveedor(form);
        setSuccess("Proveedor agregado exitosamente");
      }
      setEditing(null);
      setForm({ nombre: "", direccion: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({ nombre: p.nombre, direccion: p.direccion });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      try {
        await removeProveedor(id);
        setSuccess("Proveedor eliminado exitosamente");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ nombre: "", direccion: "" });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'direccion', label: 'Dirección' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Proveedores</h2>
          <p>Gestiona los proveedores de la tienda</p>
        </div>
        <button 
          className={styles.btnNew} 
          onClick={() => {
            setEditing(null);
            setForm({ nombre: "", direccion: "" });
            setError("");
            setSuccess("");
          }}
        >
          + Nuevo Proveedor
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
            name="direccion" 
            value={form.direccion} 
            onChange={handleChange} 
            placeholder="Dirección" 
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editing ? "Actualizar Proveedor" : "Agregar Proveedor"}
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
        data={proveedores}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        loading={loading}
        emptyMessage="No hay proveedores disponibles"
      />
    </div>
  );
}