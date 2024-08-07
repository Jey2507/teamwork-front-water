import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-app-teamwork.onrender.com/';
axios.defaults.withCredentials = true;

export default axios;