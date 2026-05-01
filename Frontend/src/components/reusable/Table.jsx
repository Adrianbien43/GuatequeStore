import styles from './Table.module.css';

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

    // Obtener un identificador único para cada fila
    const getRowKey = (row, index) => {
        // Si row.id es un objeto (InventarioId con almacenId + productoId)
        if (row.id && typeof row.id === 'object') {
            return `${row.id.almacenId}-${row.id.productoId}`;
        }
        
        // Si row.id es un primitivo (número, string)
        if (row.id) {
            return row.id;
        }
        
        // Fallbacks para otros modelos
        if (row.idProducto) return row.idProducto;
        if (row.idUsuario) return row.idUsuario;
        if (row.almacenId && row.productoId) return `${row.almacenId}-${row.productoId}`;
        if (row.almacenId) return row.almacenId;
        
        // Último recurso
        return index;
    };

    // Obtener el valor de una celda, soportando funciones render personalizadas
    const getCellValue = (row, column) => {
        if (column.render) {
            return column.render(row[column.key], row);  // Pasar row completo también
        }
        
        const value = row[column.key];
        if (typeof value === 'boolean') {
            return value ? 'Sí' : 'No';
        }
        return value;
    };

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
                        <tr 
                            key={getRowKey(row, index)} 
                            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                        >
                            {columns.map(column => (
                                <td key={`${getRowKey(row, index)}-${column.key}`}>
                                    {getCellValue(row, column)}
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