import apiClient from "./apiClient.js";

// Shorten a URL (optionally with a custom slug for authenticated users)
export const shortenUrl = async (originalUrl, slug) => {
  const payload = slug ? { url: originalUrl, slug } : { url: originalUrl };
  const response = await apiClient.post("/create", payload);
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
