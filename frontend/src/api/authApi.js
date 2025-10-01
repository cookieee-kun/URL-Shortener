import axios from "axios";

const api = axios.create({
  baseURL: '/api', // Use Vite proxy
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // e.g. { token, user }
};

export const register = async (email, password, name) => {
  const res = await api.post("/auth/register", { email, password, name });
  return res.data; // e.g. { token, user }
};