import { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import Table from "../../../../components/reusable/Table";
import styles from './ProductosCRUD.module.css';

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!form.nombre || !form.proveedorId) {
      setError("Nombre y Proveedor son campos requeridos");
      return;
    }

    try {
      const payload = { ...form, precioUnitario: parseFloat(form.precioUnitario), proveedor: { id: form.proveedorId } };
      if (editing) {
        await editProducto(editing.id, payload);
        setSuccess("Producto actualizado exitosamente");
      } else {
        await addProducto(payload);
        setSuccess("Producto creado exitosamente");
      }
      setEditing(null);
      setForm({ nombre: "", categoria: "CAMISETA", talla: "", precioUnitario: "", marca: "", genero: "HOMBRE", proveedorId: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Error al procesar el producto");
      console.error(err);
    }
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
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ nombre: "", categoria: "CAMISETA", talla: "", precioUnitario: "", marca: "", genero: "HOMBRE", proveedorId: "" });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'talla', label: 'Talla' },
    { key: 'precioUnitario', label: 'Precio' },
    { key: 'marca', label: 'Marca' },
    { key: 'genero', label: 'Género' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Gestía de Productos</h2>
          <p>Administra el catálogo de productos de la tienda</p>
        </div>
        <button className={styles.btnNew} onClick={() => { setEditing(null); setForm({ nombre: "", categoria: "CAMISETA", talla: "", precioUnitario: "", marca: "", genero: "HOMBRE", proveedorId: "" }); setError(""); setSuccess(""); }}>
          + Nuevo Producto
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del producto" required/>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="PANTALON">PANTALÓN</option>
            <option value="CAMISETA">CAMISETA</option>
            <option value="GORRA">GORRA</option>
            <option value="SUDADERA">SUDADERA</option>
          </select>
          <input name="talla" value={form.talla} onChange={handleChange} placeholder="Talla (S, M, L, XL, etc)"/>
          <input name="precioUnitario" value={form.precioUnitario} onChange={handleChange} placeholder="Precio unitario" type="number" step="0.01" required/>
          <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca"/>
          <select name="genero" value={form.genero} onChange={handleChange}>
            <option value="HOMBRE">HOMBRE</option>
            <option value="MUJER">MUJER</option>
          </select>
          <input name="proveedorId" value={form.proveedorId} onChange={handleChange} placeholder="ID del Proveedor" type="number" required/>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editing ? "Actualizar Producto" : "Crear Producto"}
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
        data={productos}
        onEdit={handleEdit}
        onDelete={(row) => removeProducto(row.id)}
        loading={loading}
        emptyMessage="No hay productos disponibles"
      />
    </div>
  );
}