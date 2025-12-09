// src/components/ProductDetail.jsx   (o ClotheItemDetail.jsx, como quieras)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getProductos } from '../../services/productService';

const ProductDetail = () => {
  const { id } = useParams();           // ← toma el ID de la URL
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductos();
        const found = res.data.find(p => p.id === parseInt(id));
        setProduct(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Cargando producto...</div>;
  if (!product) return <div style={{padding: '50px', textAlign: 'center'}}>Producto no encontrado</div>;

  const isMenPage = location.pathname.includes('/men');
  const backLink = isMenPage ? '/men' : '/women';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isMenPage ? '#111' : '#fff8f9', 
      color: isMenPage ? 'white' : '#333',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link 
          to={backLink} 
          style={{ 
            color: isMenPage ? '#00ff9d' : '#e91e63', 
            fontSize: '1.2em', 
            textDecoration: 'none' 
          }}
        >
          ← Volver a {isMenPage ? 'Moda Masculina' : 'Moda Femenina'}
        </Link>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '50px', 
          marginTop: '40px',
          alignItems: 'start'
        }}>
          <img 
            src={product.imagen || 'https://via.placeholder.com/600'} 
            alt={product.nombre}
            style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          />

          <div>
            <h1 style={{ fontSize: '3em', margin: '0 0 20px 0' }}>{product.nombre}</h1>
            <p style={{ fontSize: '1.5em', opacity: '0.8', margin: '10px 0' }}>
              {product.marca}
            </p>
            {product.talla && <p style={{ fontSize: '1.3em' }}>Talla: <strong>{product.talla}</strong></p>}
            <p style={{ fontSize: '1.2em', margin: '20px 0' }}>{product.categoria}</p>

            <p style={{ 
              fontSize: '3em', 
              fontWeight: 'bold', 
              color: isMenPage ? '#00ff9d' : '#e91e63',
              margin: '30px 0'
            }}>
              ${product.precioUnitario?.toLocaleString('es-AR')}
            </p>

            <button style={{
              padding: '18px 50px',
              background: isMenPage ? '#00ff9d' : '#e91e63',
              color: isMenPage ? 'black' : 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.4em',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;