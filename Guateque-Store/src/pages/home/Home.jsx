import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bienvenido a Guateque Store</h1>
      <p>Tu tienda de confianza para productos de calidad</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Características:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Productos para Hombre y Mujer</li>
          <li>Sistema de autenticación seguro</li>
          <li>Panel de administración</li>
          <li>Gestión completa de inventario</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;