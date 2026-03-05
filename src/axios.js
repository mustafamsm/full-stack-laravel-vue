import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
});

// axiosClient.interceptors.request.use(()=>{
//     config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
// })

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Detailed logging to diagnose network / CORS issues
    console.error('Axios error message:', error.message);
    if (error.config) console.error('Axios request config:', error.config);
    if (error.request && !error.response) {
      console.error('No response received. Request object:', error.request);
    }
    if (error.response) {
     
      if (error.response.status === 401) {
        router.push({ name: 'Login' });
      }
    }
    throw error;
  },
);
export default axiosClient;
