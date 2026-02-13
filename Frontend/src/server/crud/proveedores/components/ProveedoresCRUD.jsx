import { useState } from "react";
import { useProveedores } from "../hooks/useProveedores";

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
    <div>
      <h2>CRUD de Proveedores</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {proveedores.map((p) => (
            <li key={p.id}>
              {p.nombre} - {p.direccion || "Sin dirección"}
              <button onClick={() => handleEdit(p)}>Editar</button>
              <button onClick={() => removeProveedor(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}