import axios from 'axios';

const API_URL = 'http://localhost:8080/api/almacenes';

export const getAlmacenes = () => axios.get(API_URL);