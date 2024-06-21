// src/api/categoryAPI.js
import axios from 'axios';

const categoryAPI = {
  getCategories: async () => {
    const response = await axios.get('/category');
    return response.data;
  },
  addCategory: async (newCategory) => {
    const response = await axios.post('/category/add-category', newCategory);
    return response.data;
  },
  deleteCategory: async (value) => {
    await axios.delete(`/category/delete-category/${value}`);
  }
};

export default categoryAPI;
