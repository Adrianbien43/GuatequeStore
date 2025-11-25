import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../../../services/productService';
import { getProveedores } from '../../../services/supplierService';

const CATEGORIAS = ['HOMBRE', 'MUJER'];

function FormProducts() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [form, setForm] = useState({
    nombre: '',
    categoria: 'HOMBRE',
    talla: '',
    precioUnitario: '',
    marca: '',
    fechaFabricacion: '',
    proveedor: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [prod, prov] = await Promise.all([getProductos(), getProveedores()]);
      setProductos(prod.data);
      setProveedores(prov.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      categoria: form.categoria,
      talla: form.talla || null,
      precioUnitario: parseFloat(form.precioUnitario),
      marca: form.marca || null,
      fechaFabricacion: form.fechaFabricacion || null,
      proveedor: form.proveedor ? { id: parseInt(form.proveedor) } : null
    };

    try {
      if (editingId) {
        await updateProducto(editingId, payload);
      } else {
        await createProducto(payload);
      }
      resetForm();
      cargarDatos();
    } catch (err) {
      alert('Error al guardar');
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      categoria: 'HOMBRE',
      talla: '',
      precioUnitario: '',
      marca: '',
      fechaFabricacion: '',
      proveedor: ''
    });
    setEditingId(null);
  };

  const editar = (p) => {
    setForm({
      nombre: p.nombre || '',
      categoria: p.categoria || 'HOMBRE',
      talla: p.talla || '',
      precioUnitario: p.precioUnitario?.toString() || '',
      marca: p.marca || '',
      fechaFabricacion: p.fechaFabricacion || '',
      proveedor: p.proveedor?.id?.toString() || ''
    });
    setEditingId(p.id);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      await deleteProducto(id);
      cargarDatos();
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={form.nombre}
               onChange={e => setForm({...form, nombre: e.target.value})} required />
        <br /><br />

        <select value={form.categoria}
                onChange={e => setForm({...form, categoria: e.target.value})}>
          <option value="HOMBRE">HOMBRE</option>
          <option value="MUJER">MUJER</option>
        </select>
        <br /><br />

        <input type="text" placeholder="Talla" value={form.talla}
               onChange={e => setForm({...form, talla: e.target.value})} />
        <br /><br />

        <input type="number" step="0.01" placeholder="Precio" value={form.precioUnitario}
               onChange={e => setForm({...form, precioUnitario: e.target.value})} required />
        <br /><br />

        <input type="text" placeholder="Marca" value={form.marca}
               onChange={e => setForm({...form, marca: e.target.value})} />
        <br /><br />

        <input type="date" value={form.fechaFabricacion}
               onChange={e => setForm({...form, fechaFabricacion: e.target.value})} />
        <br /><br />

        <select value={form.proveedor}
                onChange={e => setForm({...form, proveedor: e.target.value})}>
          <option value="">Sin proveedor</option>
          {proveedores.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        <br /><br />

        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <h3>Lista de productos</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} - {p.categoria} - ${p.precioUnitario}
            {p.proveedor && ` - ${p.proveedor.nombre}`} {/* ← Corregido el error de sintaxis */}
            <button onClick={() => editar(p)}>Editar</button>
            <button onClick={() => eliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormProducts;