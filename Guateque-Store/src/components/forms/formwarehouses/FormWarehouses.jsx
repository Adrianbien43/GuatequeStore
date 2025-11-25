import React, { useState, useEffect } from 'react';
import { getAlmacenes, createAlmacen, updateAlmacen, deleteAlmacen } from '../../../services/warehouseService';

function FormWarehouses() {
  const [almacenes, setAlmacenes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Carga almacenes al iniciar
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getAlmacenes();
      setAlmacenes(res.data);
    } catch (error) {
      alert('Error al cargar almacenes');
    }
  };

  const guardar = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre.trim(),
      capacidad: capacidad ? Number(capacidad) : null,
      direccion: direccion.trim() || null
    };

    try {
      if (editandoId) {
        await updateAlmacen(editandoId, datos);
        alert('Almacén actualizado');
      } else {
        await createAlmacen(datos);
        alert('Almacén creado');
      }
      limpiar();
      cargar();
    } catch (error) {
      alert('Error al guardar');
    }
  };

  const limpiar = () => {
    setNombre('');
    setCapacidad('');
    setDireccion('');
    setEditandoId(null);
  };

  const editar = (a) => {
    setNombre(a.nombre);
    setCapacidad(a.capacidad || '');
    setDireccion(a.direccion || '');
    setEditandoId(a.id);
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este almacén?')) return;
    try {
      await deleteAlmacen(id);
      cargar();
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Gestión de Almacenes</h2>

      <form onSubmit={guardar}>
        <input
          type="text"
          placeholder="Nombre del almacén"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ width: '300px', padding: '10px', margin: '5px' }}
        />
        <br />
        <input
          type="number"
          placeholder="Capacidad (opcional)"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          style={{ width: '300px', padding: '10px', margin: '5px' }}
        />
        <br />
        <input
          type="text"
          placeholder="Dirección (opcional)"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={{ width: '300px', padding: '10px', margin: '5px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px', background: '#0066ff', color: 'white', border: 'none' }}>
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
        {editandoId && (
          <button type="button" onClick={limpiar} style={{ padding: '10px 20px', background: '#666', color: 'white', marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>

      <h3 style={{ marginTop: '40px' }}>Lista de Almacenes</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {almacenes.map((a) => (
          <li key={a.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <strong>{a.nombre}</strong>
            {a.capacidad && ` - Capacidad: ${a.capacidad}`}
            {a.direccion && ` - ${a.direccion}`}
            <button onClick={() => editar(a)} style={{ marginLeft: '20px', background: 'green', color: 'white', border: 'none', padding: '5px 10px' }}>
              Editar
            </button>
            <button onClick={() => eliminar(a.id)} style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {almacenes.length === 0 && <p>No hay almacenes aún.</p>}
    </div>
  );
}

export default FormWarehouses;