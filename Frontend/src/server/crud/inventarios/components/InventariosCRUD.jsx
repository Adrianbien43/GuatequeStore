import { useState } from "react";
import { useInventarios } from "../hooks/useInventarios";
import { useAlmacenes } from "../../almacenes/hooks/useAlmacenes";
import { useProductos } from "../../productos/hooks/useProductos";

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
    <div>
      <h2>CRUD Inventarios</h2>
      <form onSubmit={handleSubmit}>
        <select name="almacenId" value={form.almacenId} onChange={handleChange}>
          <option value="">Selecciona un almacén</option>
          {almacenes.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>
        <select name="productoId" value={form.productoId} onChange={handleChange}>
          <option value="">Selecciona un producto</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" />
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? <p>Cargando...</p> :
        <ul>
          {inventarios.map(i => (
            <li key={`${i.almacenId}-${i.productoId}`}>
              {i.almacen?.nombre} - {i.producto?.nombre} - {i.cantidad}
              <button onClick={() => handleEdit(i)}>Editar</button>
              <button onClick={() => removeInventario(i.almacenId, i.productoId)}>Eliminar</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
