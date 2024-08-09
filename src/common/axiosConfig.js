import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-app-teamwork.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:3003/';
axios.defaults.withCredentials = true;

export default axios;
