// src/pages/Women.jsx
import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/productService';

const Women = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWomenProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductos();
        const allProducts = response.data;

        // Filtramos productos de mujer (acepta varias formas comunes del backend)
        const womenProducts = allProducts.filter((prod) => {
          const category = (prod.category || prod.categoria || '').toString().toUpperCase();
          return category === 'WOMEN' || category === 'MUJER' || category === 'WOMAN';
        });

        setProducts(womenProducts);
      } catch (err) {
        console.error('Error cargando productos para mujer:', err);
        setError('No se pudieron cargar los productos. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadWomenProducts();
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
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '2rem', 
        textAlign: 'center',
        fontWeight: '600'
      }}>
        Productos para Mujer
      </h1>

      {products.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: '#666',
          marginTop: '3rem'
        }}>
          No hay productos disponibles en esta categoría por el momento.
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
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* Si tienes imágenes, descomenta: */}
              {/* <img 
                src={product.imageUrl || product.imagen} 
                alt={product.name || product.nombre}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
              /> */}

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  margin: '0 0 0.75rem 0', 
                  fontSize: '1.4rem',
                  color: '#333'
                }}>
                  {product.name || product.nombre}
                </h3>
                <p style={{ margin: '0.5rem 0', color: '#555' }}>
                  <strong>Marca:</strong> {product.brand || product.marca}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#555' }}>
                  <strong>Precio:</strong> ${Number(product.unitPrice || product.precio).toLocaleString('es-AR')}
                </p>
                {(product.size || product.talla) && (
                  <p style={{ margin: '0.5rem 0', color: '#555' }}>
                    <strong>Talla:</strong> {product.size || product.talla}
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

export default Women;