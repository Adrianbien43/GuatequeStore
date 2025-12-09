import React from "react";

const CustomerList = ({ customers, loading, onDelete, styles }) => {
  if (loading) return <p>Cargando clientes...</p>;
  if (customers.length === 0) return <p>No hay clientes registrados</p>;
  
  return (
    <div className={styles.listContainer}>
      {customers.map((c) => (
        <div key={c.id} className={styles.listItem}>
          <div>
            <strong>{c.nombre}</strong> <br />
            <small>Email: {c.email}</small> <br />
            <small>Dirección: {c.direccion || "No especificada"}</small>
          </div>

          <button
            onClick={() => onDelete(c.id, c.nombre)}
            className={styles.deleteButton}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
