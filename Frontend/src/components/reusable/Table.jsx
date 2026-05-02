// Table.jsx - VERSION RESPONSIVA (conversión a cards en móvil)
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

    const getRowKey = (row, index) => {
        if (row.id && typeof row.id === 'object') {
            return `${row.id.almacenId}-${row.id.productoId}`;
        }
        if (row.almacenId !== undefined && row.productoId !== undefined) {
            return `${row.almacenId}-${row.productoId}`;
        }
        if (row.id) return String(row.id);
        if (row.idProducto) return String(row.idProducto);
        if (row.idUsuario) return String(row.idUsuario);
        if (row.almacenId) return String(row.almacenId);
        return `row-${index}`;
    };

    const getCellValue = (row, column) => {
        if (column.render) {
            return column.render(row[column.key], row);
        }
        const value = row[column.key];
        if (typeof value === 'boolean') return value ? 'Sí' : 'No';
        if (value === null || value === undefined) return '-';
        return value;
    };

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.desktopOnly}>
                {/* Tabla para pantallas grandes */}
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
                                <tr key={rowKey} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    {columns.map(column => (
                                        <td key={`${rowKey}-${column.key}`}>
                                            {getCellValue(row, column)}
                                        </td>
                                    ))}
                                    <td className={styles.actions}>
                                        {onEdit && (
                                            <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => onEdit(row)}>
                                                ✏️ Editar
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => onDelete(row)}>
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

            {/* Vista de tarjetas para móviles (se muestra solo en pantallas pequeñas) */}
            <div className={styles.mobileOnly}>
                {data.map((row, index) => {
                    const rowKey = getRowKey(row, index);
                    return (
                        <div key={rowKey} className={styles.card}>
                            {columns.map(column => (
                                <div key={`${rowKey}-${column.key}`} className={styles.cardRow}>
                                    <span className={styles.cardLabel}>{column.label}:</span>
                                    <span className={styles.cardValue}>{getCellValue(row, column)}</span>
                                </div>
                            ))}
                            <div className={styles.cardActions}>
                                {onEdit && (
                                    <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => onEdit(row)}>
                                        ✏️ Editar
                                    </button>
                                )}
                                {onDelete && (
                                    <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => onDelete(row)}>
                                        🗑️ Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}