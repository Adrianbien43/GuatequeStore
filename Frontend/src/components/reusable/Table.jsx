import styles from './Table.module.css';

/**
 * Table - Componente de tabla reutilizable
 * Muestra datos en formato tabular con acciones de edit y delete
 * 
 * Props:
 * - columns: Array<{key: string, label: string}> - definición de columnas
 * - data: Array<Object> - datos a mostrar
 * - onEdit: function(row) - callback al hacer click en edit
 * - onDelete: function(row) - callback al hacer click en delete
 * - loading: boolean - mostrar estado de carga
 * - emptyMessage: string - mensaje cuando no hay datos
 * 
 * Example:
 * const columns = [
 *   { key: 'nombre', label: 'Nombre' },
 *   { key: 'email', label: 'Email' }
 * ];
 * <Table columns={columns} data={items} onEdit={handleEdit} onDelete={handleDelete} />
 */
export default function Table({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  loading = false,
  emptyMessage = 'No hay datos disponibles'
}) {
  if (loading) {
    return <div className={styles.loading}>Cargando datos...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th className={styles.actionsHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              {columns.map(column => (
                <td key={column.key}>
                  {typeof row[column.key] === 'boolean' 
                    ? (row[column.key] ? 'Sí' : 'No')
                    : row[column.key]
                  }
                </td>
              ))}
              <td className={styles.actions}>
                {onEdit && (
                  <button 
                    className={`${styles.btn} ${styles.btnEdit}`}
                    onClick={() => onEdit(row)}
                    title="Editar"
                  >
                    ✏️ Editar
                  </button>
                )}
                {onDelete && (
                  <button 
                    className={`${styles.btn} ${styles.btnDelete}`}
                    onClick={() => onDelete(row)}
                    title="Eliminar"
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
