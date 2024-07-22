// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryAPI from './categoryAPI';

// Async Thunks for API Calls
export const fetchCategoriesAsync = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await categoryAPI.getCategories();
  console.log(response);
  console.log("'----------------");
  console.log(response);
  return response;
});

export const addCategoryAsync = createAsyncThunk('categories/addCategory', async (newCategory) => {
  const response = await categoryAPI.addCategory(newCategory);
  console.log(response);
  return response;
});

export const deleteCategoryAsync = createAsyncThunk('categories/deleteCategory', async (value) => {
  const response = await categoryAPI.deleteCategory(value);
  return response.data;
});

// Category Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.value !== action.payload);
      });
  }
});

export default categorySlice.reducer;
