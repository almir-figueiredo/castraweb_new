import axios from 'axios';

// IOS = localhost
// Android = 10.0.2.2

const api = axios.create({
  baseURL: 'http://192.168.15.8:3333',
});

export default api;
