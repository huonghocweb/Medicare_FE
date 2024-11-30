import axios from "axios";
import { getToken } from "../services/AuthService";

const axiosInstance = axios.create({
    baseURL : 'http://localhost:8080/',
    timeout : 10000,
    headers : {
        'Content-Type' : 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    console.log(token);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
} , (error) => {
    return Promise.reject(error);
})

// Thêm interceptor cho response nếu cần
axiosInstance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // Xử lý lỗi toàn cục (ví dụ: logout nếu token hết hạn)
    if (error.response && error.response.status === 401) {
      // Thực hiện các hành động khi token hết hạn (ví dụ: logout)
      console.log('Unauthorized, please login again.');
      localStorage.removeItem('token');
      // Chuyển hướng về trang login
    }
    return Promise.reject(error);
  });


  export default axiosInstance;