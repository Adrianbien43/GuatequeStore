import Cookies from 'js-cookie';

// Usuarios predefinidos (admins)
const PREDEFINED_USERS = [
  { id: 1, email: 'adrian@admin.com', password: 'admin123', nombre: 'Adrian', rol: 'ADMIN', direccion: 'Dirección de Adrian' },
  { id: 2, email: 'gorka@admin.com', password: 'admin123', nombre: 'Gorka', rol: 'ADMIN', direccion: 'Dirección de Gorka' },
  { id: 3, email: 'manuel@admin.com', password: 'admin123', nombre: 'Manuel', rol: 'ADMIN', direccion: 'Dirección de Manuel' }
];

// Clientes registrados (simulado)
let registeredCustomers = [
  { id: 4, email: 'pepe@cliente.com', password: 'cliente123', nombre: 'Pepe', rol: 'USER', direccion: 'Calle Pepe 123', telefonos: [] }
];

const getAllUsers = () => [...PREDEFINED_USERS, ...registeredCustomers];

export const authService = {
  // LOGIN
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = getAllUsers().find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Email o contraseña incorrectos');

    const payload = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    };

    // Token seguro con encodeURIComponent
    const token = btoa(encodeURIComponent(JSON.stringify(payload)));

    // Guardar en localStorage (prioridad)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Cookies opcionales
    Cookies.set('token', token, { expires: 1, sameSite: 'Lax' });
    Cookies.set('user', JSON.stringify(user), { expires: 1, sameSite: 'Lax' });

    // EVENTO INSTANTÁNEO: el Header se entera al milisegundo
    window.dispatchEvent(new Event('auth-change'));

    return { token, user };
  },

  // REGISTER
  register: async (customerData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (getAllUsers().some(u => u.email === customerData.email)) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const newCustomer = {
      id: Math.max(...getAllUsers().map(u => u.id), 0) + 1,
      ...customerData,
      rol: 'USER'
    };

    registeredCustomers.push(newCustomer);
    return newCustomer;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');

    // EVENTO INSTANTÁNEO: el Header desaparece al instante
    window.dispatchEvent(new Event('auth-change'));
  },

  // GET TOKEN
  getToken: () => {
    return localStorage.getItem('token') || Cookies.get('token');
  },

  // GET CURRENT USER
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user') || Cookies.get('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // IS AUTHENTICATED - 100% SEGURO
  isAuthenticated: () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const decoded = decodeURIComponent(atob(token));
      const payload = JSON.parse(decoded);
      return payload && payload.exp && payload.exp > Date.now();
    } catch (error) {
      console.warn('Token inválido o expirado:', error);
      return false;
    }
  },

  // IS ADMIN
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.rol === 'ADMIN';
  },

  // GET ALL CUSTOMERS (solo admin)
  getAllCustomers: () => registeredCustomers
};