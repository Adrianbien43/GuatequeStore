import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '1rem', 
      borderTop: '1px solid #ccc', 
      textAlign: 'center',
      background: '#f5f5f5'
    }}>
      <p>&copy; {new Date().getFullYear()} Guateque Store. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;