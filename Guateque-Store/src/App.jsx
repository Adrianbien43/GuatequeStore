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
import { authService } from './services/authService';
import './App.css';

// Componente para rutas protegidas (solo usuarios autenticados)
const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

// Componente para rutas de admin
const AdminRoute = ({ children }) => {
  return authService.isAuthenticated() && authService.isAdmin() ? children : <Navigate to="/" />;
};

// Componente para rutas públicas (solo para no autenticados)
const PublicRoute = ({ children }) => {
  return !authService.isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/men" 
              element={
                <ProtectedRoute>
                  <Men />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/women" 
              element={
                <ProtectedRoute>
                  <Women />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/panel" 
              element={
                <AdminRoute>
                  <Panel />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;