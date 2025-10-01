import axios from "axios";

const apiClient = axios.create({
  baseURL: '/api', // Use Vite proxy for consistency
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: add auth token automatically if available
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;