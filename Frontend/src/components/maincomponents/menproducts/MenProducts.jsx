import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getProductos } from '../../../services/productService';
import { manImageService } from '../../../services/manImageService';
import styles from './MenProducts.module.css';

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProductos();
        // Cambiado: Ahora filtramos por el campo 'genero'
        const menProducts = (response.data || []).filter(p =>
          p.genero === 'HOMBRE' || p.genero === 'hombre'
        );
        setProducts(menProducts);
      } catch (err) {
        setError('Error cargando productos');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <NavLink key={product.id} to={`/men/${product.id}`} className={styles.cardLink}>
          <article className={styles.card}>
            <img
              src={manImageService.getOptimizedImage(product)}
              alt={product.nombre}
              className={styles.image}
              onError={(e) => e.target.src = manImageService.getDefaultImage()}
            />

            <div className={styles.content}>
              <h3>{product.nombre || 'Sin nombre'}</h3>
              <p className={styles.brand}>{product.marca}</p>
              <p className={styles.category}>{product.categoria}</p>
              {product.talla && <p>Talla: {product.talla}</p>}

              <div className={styles.footer}>
                <span className={styles.price}>
                  ${product.precioUnitario?.toLocaleString('es-AR') || '0'}
                </span>
                <button className={styles.button}>Ver detalle</button>
              </div>
            </div>
          </article>
        </NavLink>
      ))}
    </div>
  );
};

export default MenProducts;