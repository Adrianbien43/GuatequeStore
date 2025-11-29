// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/maincomponents/header/Header';
import Footer from './components/maincomponents/footer/Footer';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Men from './pages/men/Men';
import Women from './pages/women/Women';
import Panel from './pages/panel/Panel';

// AÑADIDO: componente de detalle del producto
import ProductDetail from './components/clotheitem/ProductDetail'; // Crea este archivo (te lo doy abajo)

import { authService } from './services/authService';
import './App.css';

const ProtectedRoute = ({ children }) =>
  authService.isAuthenticated() ? children : <Navigate to="/login" />;

const AdminRoute = ({ children }) =>
  authService.isAuthenticated() && authService.isAdmin() ? children : <Navigate to="/" />;

const PublicRoute = ({ children }) =>
  !authService.isAuthenticated() ? children : <Navigate to="/" />;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/panel" element={<AdminRoute><Panel /></AdminRoute>} />

            {/* RUTAS DE HOMBRE - con detalle dinámico */}
            <Route path="/men">
              {/* Esta ruta va PRIMERO: /men/5, /men/23, etc. */}
              <Route path=":id" element={<PublicRoute><ProductDetail /></PublicRoute>} />
              {/* Esta es la lista normal */}
              <Route index element={<PublicRoute><Men /></PublicRoute>} />
            </Route>

            {/* RUTAS DE MUJER - con detalle dinámico */}
            <Route path="/women">
              {/* Esta ruta va PRIMERO: /women/12, /women/45, etc. */}
              <Route path=":id" element={<PublicRoute><ProductDetail /></PublicRoute>} />
              {/* Esta es la lista normal */}
              <Route index element={<PublicRoute><Women /></PublicRoute>} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;