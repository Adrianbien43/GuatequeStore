import { useState } from "react";
import { useAlmacenes } from "../hooks/useAlmacenes";

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

  return (
    <div>
      <h2>CRUD Almacenes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="capacidad" value={form.capacidad} onChange={handleChange} type="number" placeholder="Capacidad" />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? <p>Cargando...</p> :
        <ul>
          {almacenes.map(a => (
            <li key={a.id}>
              {a.nombre} - {a.capacidad} - {a.direccion || "Sin dirección"}
              <button onClick={() => handleEdit(a)}>Editar</button>
              <button onClick={() => removeAlmacen(a.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
