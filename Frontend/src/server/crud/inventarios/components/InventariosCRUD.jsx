import { useState } from "react";
import { useInventarios } from "../hooks/useInventarios";
import { useAlmacenes } from "../../almacenes/hooks/useAlmacenes";
import { useProductos } from "../../productos/hooks/useProductos";
import styles from './InventariosCRUD.module.css';

export default function InventariosCRUD() {
  const { inventarios, loading, addInventario, editInventario, removeInventario } = useInventarios();
  const { almacenes } = useAlmacenes();
  const { productos } = useProductos();
  const [form, setForm] = useState({ almacenId: "", productoId: "", cantidad: 0 });
  const [editing, setEditing] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      editInventario(form.almacenId, form.productoId, { cantidad: Number(form.cantidad) });
      setEditing(null);
    } else {
      addInventario({ almacen: { id: form.almacenId }, producto: { id: form.productoId }, cantidad: Number(form.cantidad) });
    }
    setForm({ almacenId: "", productoId: "", cantidad: 0 });
  };

  const handleEdit = i => {
    setEditing(i);
    setForm({ almacenId: i.almacenId, productoId: i.productoId, cantidad: i.cantidad });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>CRUD Inventarios</h2>
          <p>Gestiona el stock de productos en los almacenes</p>
        </div>
        <button className={styles.btnNew} onClick={() => setEditing({ id: null })}>
          + Nuevo Inventario
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <select name="almacenId" value={form.almacenId} onChange={handleChange}>
            <option value="">Selecciona un almacén</option>
            {almacenes.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <select name="productoId" value={form.productoId} onChange={handleChange}>
            <option value="">Selecciona un producto</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" />
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? <p className={styles.loading}>Cargando...</p> :
        <ul className={styles.lista}>
          {inventarios.map(i => (
            <li key={`${i.almacenId}-${i.productoId}`} className={styles.item}>
              <span>{i.almacen?.nombre} - {i.producto?.nombre} - {i.cantidad}</span>
              <div>
                <button onClick={() => handleEdit(i)}>Editar</button>
                <button onClick={() => removeInventario(i.almacenId, i.productoId)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}