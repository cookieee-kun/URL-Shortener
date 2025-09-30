import apiClient from "./apiClient.js";

// Shorten a URL
export const shortenUrl = async (originalUrl, user) => {
  const response = await apiClient.post("/api/create", { url: originalUrl, user });
  return response.data; 
};

// Expand a shortened URL
export const getOriginalUrl = async (shortCode) => {
  const response = await apiClient.get(`/expand/${shortCode}`);
  return response.data;
};
