// src/api/categoryAPI.js
import axios from 'axios';

const GET_CATEGORIES_URL = 'http://localhost:5000/category';
const ADD_CATEGORY_URL = 'http://localhost:5000/category/add-category';
const DELETE_CATEGORY_URL = 'http://localhost:5000/category/delete-category';



const categoryAPI = {
  getCategories: async () => {
    console.log("Getting called");
    const response = await axios.get(GET_CATEGORIES_URL);
    console.log(response.data);
    return response.data;
  },
  addCategory: async (newCategory) => {
    console.log(newCategory);
    const response = await axios.post(ADD_CATEGORY_URL, newCategory);
    console.log(response.data);
    return response.data;
  },
  deleteCategory: async (value) => {
    await axios.delete(`${DELETE_CATEGORY_URL}/${value}`);
  }
};

export default categoryAPI;
