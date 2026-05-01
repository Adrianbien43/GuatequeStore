import { useState } from "react";
import { useInventarios } from "../hooks/useInventarios";
import { useAlmacenes } from "../../almacenes/hooks/useAlmacenes";
import { useProductos } from "../../productos/hooks/useProductos";
import Table from "../../../../components/reusable/Table";
import styles from './InventariosCRUD.module.css';

export default function InventariosCRUD() {
  const { inventarios, loading, error, addInventario, editInventario, removeInventario, setError } = useInventarios();
  const { almacenes, loading: almacenesLoading } = useAlmacenes();
  const { productos, loading: productosLoading } = useProductos();
  const [form, setForm] = useState({ almacenId: "", productoId: "", cantidad: 0 });
  const [editing, setEditing] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.almacenId || !form.productoId || form.cantidad < 0) {
      setError("Todos los campos son requeridos y la cantidad debe ser válida");
      return;
    }
    try {
      if (editing) {
        await editInventario(form.almacenId, form.productoId, { cantidad: Number(form.cantidad) });
        setSuccess("Inventario actualizado exitosamente");
      } else {
        await addInventario({ almacen: { id: form.almacenId }, producto: { id: form.productoId }, cantidad: Number(form.cantidad) });
        setSuccess("Inventario agregado exitosamente");
      }
      setEditing(null);
      setForm({ almacenId: "", productoId: "", cantidad: 0 });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = i => {
    setEditing(i);
    setForm({ almacenId: i.almacen?.id || i.almacenId, productoId: i.producto?.id || i.productoId, cantidad: i.cantidad });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (almacenId, productoId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este inventario?")) {
      try {
        await removeInventario(almacenId, productoId);
        setSuccess("Inventario eliminado exitosamente");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ almacenId: "", productoId: "", cantidad: 0 });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'almacen', label: 'Almacén', render: (row) => row?.nombre || row?.almacen?.nombre || 'N/A' },
    { key: 'producto', label: 'Producto', render: (row) => row?.nombre || row?.producto?.nombre || 'N/A' },
    { key: 'cantidad', label: 'Cantidad' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Inventarios</h2>
          <p>Gestiona el stock de productos en los almacenes</p>
        </div>
        <button 
          className={styles.btnNew} 
          onClick={() => {
            setEditing(null);
            setForm({ almacenId: "", productoId: "", cantidad: 0 });
            setError("");
            setSuccess("");
          }}
        >
          + Nuevo Inventario
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <select name="almacenId" value={form.almacenId} onChange={handleChange} required disabled={almacenesLoading}>
            <option value="">Selecciona un almacén {almacenesLoading && '(cargando...)'}</option>
            {almacenes.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <select name="productoId" value={form.productoId} onChange={handleChange} required disabled={productosLoading}>
            <option value="">Selecciona un producto {productosLoading && '(cargando...)'}</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <input 
            type="number" 
            name="cantidad" 
            value={form.cantidad} 
            onChange={handleChange} 
            placeholder="Cantidad" 
            min="0"
            required 
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editing ? "Actualizar Inventario" : "Agregar Inventario"}
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
        data={inventarios}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.almacen?.id || row.almacenId, row.producto?.id || row.productoId)}
        loading={loading}
        emptyMessage="No hay inventarios disponibles"
      />
    </div>
  );
}