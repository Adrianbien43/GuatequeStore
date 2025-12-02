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

//Componente donde veremos los detalles de cada producto
import ProductDetail from './components/clotheitem/ProductDetail'; // Crea este archivo (te lo doy abajo)

//Funciones 
import { authService } from './services/authService';
import './App.css';

//Rutas protegidas
const ProtectedRoute = ({ children }) =>
  authService.isAuthenticated() ? children : <Navigate to="/login" />;

//Solo para administradores
const AdminRoute = ({ children }) =>
  authService.isAuthenticated() && authService.isAdmin() ? children : <Navigate to="/" />;

// Solo para usuarios no logueados
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

            {/* Rutas para la seccion de hombres */}
            <Route path="/men">
              {/* Esta muestra un producto */}
              <Route path=":id" element={<PublicRoute><ProductDetail /></PublicRoute>} />
              {/* Muestra todos los productos de hombres */}
              <Route index element={<PublicRoute><Men /></PublicRoute>} />
            </Route>

            {/* Lo mismo pero la seccion de mujeres */}
            <Route path="/women">
              <Route path=":id" element={<PublicRoute><ProductDetail /></PublicRoute>} />
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