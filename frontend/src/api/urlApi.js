import apiClient from "./apiClient.js";

// Shorten a URL
export const shortenUrl = async (originalUrl, user) => {
  const response = await apiClient.post("/create", { url: originalUrl, user });
  return response.data;
};

// Get all URLs from a user
export const getAllUserUrls = async () => {
  const response = await apiClient.get("/user/urls");
  return response.data;
};

// Delete a URL
export const deleteUrl = async (urlId) => {
  const response = await apiClient.delete(`/url/${urlId}`);
  return response.data;
};
