import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://blinklink.fun/api/',
  withCredentials: true,
});

export default axiosInstance;
