import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productAPI from './productAPI';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const response = await productAPI.getAll();
    return response.data;
});
export const addProduct = createAsyncThunk('product/addProduct', async (newProduct) => {
    const response = await productAPI.create(newProduct);
    return response.data;
  });

const initialState= { 
     products: [],
     status: "idle", 
     error: null 
    }
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductLocal(state, action) { 
        state.products.push(action.payload); //new product to local state, refresh nagari change garauna
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'adding';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
        console.log(state.products);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { addProductLocal } = productSlice.actions;
export default productSlice.reducer;

//add it in fulfilled part of addProduct

// const existingProduct = state.products.find(
//   product => product.details.name === action.payload.details.name &&
//              product.details.brand === action.payload.details.brand
// );
// if (existingProduct) {
//   existingProduct.instock = action.payload.instock;
// } else {
//   state.products.push(action.payload);
// }