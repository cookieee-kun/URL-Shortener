import axios from "axios";
import apiClient from "./apiClient.js";

export const login = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data; // e.g. { token, user }
};

export const register = async (email, password, name) => {
  const res = await apiClient.post("/auth/register", { email, password, name });
  return res.data; // e.g. { token, user }
};    