import styles from './ConfirmDialog.module.css';

/**
 * ConfirmDialog - Diálogo de confirmación reutilizable
 * Muestra un modal para confirmar acciones destructivas como eliminar
 * 
 * Props:
 * - isOpen: boolean - controla visibilidad del diálogo
 * - title: string - título del diálogo
 * - message: string - mensaje de confirmación
 * - onConfirm: function - callback al confirmar
 * - onCancel: function - callback al cancelar
 * - loading: boolean - mostrar estado de carga
 * - danger: boolean - aplicar estilo de peligro (rojo)
 * 
 * Example:
 * <ConfirmDialog
 *   isOpen={showDelete}
 *   title="Eliminar Proveedor"
 *   message="¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer."
 *   onConfirm={handleConfirmDelete}
 *   onCancel={() => setShowDelete(false)}
 *   danger={true}
 * />
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
  danger = true
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={`${styles.icon} ${danger ? styles.dangerIcon : styles.infoIcon}`}>
            {danger ? '⚠️' : 'ℹ️'}
          </div>
          
          <h2 className={styles.title}>{title}</h2>
          
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.btnCancel}
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={`${styles.btnConfirm} ${danger ? styles.btnDanger : styles.btnPrimary}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
