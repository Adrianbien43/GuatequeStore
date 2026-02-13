import { useState } from "react";
import { useProductos } from "../hooks/useProductos";

export default function ProductosCRUD() {
  const { productos, loading, addProducto, editProducto, removeProducto } = useProductos();
  const [form, setForm] = useState({
    nombre: "",
    categoria: "CAMISETA",
    talla: "",
    precioUnitario: "",
    marca: "",
    genero: "HOMBRE",
    proveedorId: "",
  });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, precioUnitario: parseFloat(form.precioUnitario), proveedor: { id: form.proveedorId } };
    if (editing) {
      editProducto(editing.id, payload);
      setEditing(null);
    } else {
      addProducto(payload);
    }
    setForm({ nombre: "", categoria: "CAMISETA", talla: "", precioUnitario: "", marca: "", genero: "HOMBRE", proveedorId: "" });
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      talla: p.talla || "",
      precioUnitario: p.precioUnitario,
      marca: p.marca || "",
      genero: p.genero || "HOMBRE",
      proveedorId: p.proveedor?.id || "",
    });
  };

  return (
    <div>
      <h2>CRUD de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required/>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="PANTALON">PANTALON</option>
          <option value="CAMISETA">CAMISETA</option>
          <option value="GORRA">GORRA</option>
          <option value="SUDADERA">SUDADERA</option>
        </select>
        <input name="talla" value={form.talla} onChange={handleChange} placeholder="Talla"/>
        <input name="precioUnitario" value={form.precioUnitario} onChange={handleChange} placeholder="Precio" type="number" step="0.01"/>
        <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca"/>
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="HOMBRE">HOMBRE</option>
          <option value="MUJER">MUJER</option>
        </select>
        <input name="proveedorId" value={form.proveedorId} onChange={handleChange} placeholder="ID Proveedor" required/>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? <p>Cargando...</p> : 
        <ul>
          {productos.map(p => (
            <li key={p.id}>
              {p.nombre} - {p.categoria} - ${p.precioUnitario}
              <button onClick={() => handleEdit(p)}>Editar</button>
              <button onClick={() => removeProducto(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
