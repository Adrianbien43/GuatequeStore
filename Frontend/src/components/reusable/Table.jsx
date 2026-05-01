// Table.jsx - CORREGIDO
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
        // DEBUG
        console.log("Row:", row, "ID:", row.id, "Tipo ID:", typeof row.id);
        
        // Si el backend envía id como objeto {almacenId, productoId}
        if (row.id && typeof row.id === 'object') {
            return `${row.id.almacenId}-${row.id.productoId}`;
        }
        
        // Si hay campos sueltos
        if (row.almacenId !== undefined && row.productoId !== undefined) {
            return `${row.almacenId}-${row.productoId}`;
        }
        
        // Fallbacks para otros modelos
        if (row.id) return String(row.id);
        if (row.idProducto) return String(row.idProducto);
        if (row.idUsuario) return String(row.idUsuario);
        if (row.almacenId) return String(row.almacenId);
        
        return `row-${index}`;
    };

    // Obtener el valor de una celda
    const getCellValue = (row, column) => {
        if (column.render) {
            return column.render(row[column.key], row);
        }
        
        const value = row[column.key];
        if (typeof value === 'boolean') {
            return value ? 'Sí' : 'No';
        }
        if (value === null || value === undefined) {
            return '-';
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
                    {data.map((row, index) => {
                        const rowKey = getRowKey(row, index);
                        return (
                            <tr 
                                key={rowKey} 
                                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                            >
                                {columns.map(column => (
                                    <td key={`${rowKey}-${column.key}`}>
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
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}