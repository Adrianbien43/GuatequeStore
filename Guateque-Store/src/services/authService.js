import Cookies from 'js-cookie';

// Usuarios predefinidos para testing
const PREDEFINED_USERS = [
  { 
    id: 1, 
    email: 'adrian@admin.com', 
    password: 'admin123', 
    nombre: 'Adrian', 
    rol: 'ADMIN',
    direccion: 'Dirección de Adrian'
  },
  { 
    id: 2, 
    email: 'gorka@admin.com', 
    password: 'admin123', 
    nombre: 'Gorka', 
    rol: 'ADMIN',
    direccion: 'Dirección de Gorka'
  },
  { 
    id: 3, 
    email: 'manuel@admin.com', 
    password: 'admin123', 
    nombre: 'Manuel', 
    rol: 'ADMIN',
    direccion: 'Dirección de Manuel'
  }
];

// Base de datos simulada de clientes registrados
let registeredCustomers = [
  { 
    id: 4, 
    email: 'pepe@cliente.com', 
    password: 'cliente123', 
    nombre: 'Pepe', 
    rol: 'USER',
    direccion: 'Calle Pepe 123',
    telefonos: []
  }
];

// Combinar todos los usuarios
const getAllUsers = () => [...PREDEFINED_USERS, ...registeredCustomers];

export const authService = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Buscar en todos los usuarios
    const user = getAllUsers().find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Crear token simulado
    const simulatedToken = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }));

    // Guardar en localStorage y cookies
    localStorage.setItem('token', simulatedToken);
    localStorage.setItem('user', JSON.stringify(user));
    Cookies.set('token', simulatedToken, { expires: 1, secure: false, sameSite: 'Lax' });
    Cookies.set('user', JSON.stringify(user), { expires: 1, secure: false, sameSite: 'Lax' });

    return { 
      token: simulatedToken, 
      user: user
    };
  },

  register: async (customerData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar si el email ya existe
    const existingUser = getAllUsers().find(u => u.email === customerData.email);
    if (existingUser) {
      throw new Error('Ya existe un usuario con ese email');
    }

    // Crear nuevo cliente
    const newCustomer = {
      id: Math.max(...getAllUsers().map(u => u.id)) + 1,
      ...customerData,
      rol: 'USER'
    };

    registeredCustomers.push(newCustomer);
    
    // NO hacemos auto-login, solo retornamos el cliente creado
    return newCustomer;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
  },

  getToken: () => {
    return localStorage.getItem('token') || Cookies.get('token');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user') || Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch (error) {
      return false;
    }
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.rol === 'ADMIN';
  },

  // Método para obtener todos los clientes (solo admin)
  getAllCustomers: () => {
    return registeredCustomers;
  }
};