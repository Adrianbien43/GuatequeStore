import React from "react";

const UsuarioList = ({ usuarios, loading, onDelete, styles }) => {
  if (loading) return <p>Cargando usuarios...</p>;
  if (usuarios.length === 0) return <p>No hay usuarios registrados</p>;
  
  return (
    <div className={styles.listContainer}>
      {usuarios.map((usuario) => (
        <div key={usuario.idUsuario || usuario.id} className={styles.listItem}>
          <div>
            <strong>{usuario.nombre}</strong> <br />
            <small>Email: {usuario.email}</small> <br />
            <small>Dirección: {usuario.direccion || "No especificada"}</small> <br />
            <small>Rol: {usuario.rol}</small> <br />
            <small>Estado: {usuario.activo ? "Activo" : "Inactivo"}</small>
          </div>

          <button
            onClick={() => onDelete(usuario.idUsuario || usuario.id, usuario.nombre)}
            className={styles.deleteButton}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsuarioList;