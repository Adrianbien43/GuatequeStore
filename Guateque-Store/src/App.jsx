// App.jsx CORREGIDO
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
import ProductDetail from './components/clotheitem/ProductDetail';
import { authService } from './services/authService';
import './App.css';

// Solo para administradores
const AdminRoute = ({ children }) =>
  authService.isAuthenticated() && authService.isAdmin() ? children : <Navigate to="/login" />;

// Solo para usuarios NO autenticados (login y register)
const GuestRoute = ({ children }) =>
  !authService.isAuthenticated() ? children : <Navigate to="/" />;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Rutas públicas (accesibles siempre) */}
            <Route path="/" element={<Home />} />
            <Route path="/men">
              <Route path=":id" element={<ProductDetail />} />
              <Route index element={<Men />} />
            </Route>
            <Route path="/women">
              <Route path=":id" element={<ProductDetail />} />
              <Route index element={<Women />} />
            </Route>

            {/* Rutas solo para invitados (NO autenticados) */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            {/* Rutas protegidas */}
            <Route path="/panel" element={<AdminRoute><Panel /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;