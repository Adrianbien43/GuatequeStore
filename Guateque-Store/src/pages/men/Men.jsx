// src/pages/Men.jsx  (o donde lo tengas ubicado)
import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/productService'; // Ajusta la ruta si es necesario

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductos(); // Obtiene todos los productos
        const allProducts = response.data;

        // Filtramos los productos de categoría HOMBRE (ajusta el campo según tu backend)
        const menProducts = allProducts.filter(
          (prod) =>
            prod.category === 'MEN' || 
            prod.category === 'HOMBRE' || 
            prod.categoria === 'MEN' || 
            prod.categoria === 'HOMBRE'
        );

        setProducts(menProducts);
      } catch (err) {
        console.error('Error cargando productos para hombres:', err);
        setError('No se pudieron cargar los productos. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadMenProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#d32f2f' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        Productos para Hombre
      </h1>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Si tienes imágenes, descomenta la siguiente línea */}
              {/* <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} /> */}

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.4rem' }}>
                  {product.name || product.nombre}
                </h3>
                <p style={{ margin: '0.5rem 0', color: '#555' }}>
                  <strong>Marca:</strong> {product.brand || product.marca}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#555' }}>
                  <strong>Precio:</strong> ${Number(product.unitPrice || product.precio).toLocaleString()}
                </p>
                {product.size && (
                  <p style={{ margin: '0.5rem 0', color: '#555' }}>
                    <strong>Talla:</strong> {product.size}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Men;