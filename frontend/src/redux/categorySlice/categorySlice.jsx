// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryAPI from './categoryAPI';

// Async Thunks for API Calls
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await categoryAPI.fetchCategories();
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
  const response = await categoryAPI.addCategory(newCategory);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (value) => {
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
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.value !== action.payload);
      });
  }
});

export default categorySlice.reducer;
