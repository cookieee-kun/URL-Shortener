import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const urlService = {
  // Create a shortened URL
  createShortUrl: async (originalUrl) => {
    try {
      const response = await api.post('/create', {
        url: originalUrl
      });
      return response.data;
    } catch (error) {
      console.error('Error creating short URL:', error);
      throw new Error(
        error.response?.data?.message ||
        'Failed to create shortened URL. Please try again.'
      );
    }
  },

  // Create a custom shortened URL (if needed in the future)
  createCustomShortUrl: async (originalUrl, slug) => {
    try {
      const response = await api.post('/create', {
        url: originalUrl,
        slug: slug
      });
      return response.data;
    } catch (error) {
      console.error('Error creating custom short URL:', error);
      throw new Error(
        error.response?.data?.message ||
        'Failed to create custom shortened URL. Please try again.'
      );
    }
  }
};

export default api;