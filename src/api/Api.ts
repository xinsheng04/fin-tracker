import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers:{'Content-Type':'application/json'},
  timeout:0,
})

export default api;