// src/redux/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderAPI from './orderAPI'; // Path to your order API service
import { updateStock } from '../productSlice/productSlice';

// Async thunk to place an order
export const placeOrderAsync = createAsyncThunk('order/placeOrder',async (orderData, { dispatch, rejectWithValue }) => {
    try {
        console.log("PlaceOrderAsync");
      const response = await orderAPI.placeOrder(orderData);
      console.log(response);
      dispatch(updateStock({ productId: orderData.order.productId, quantity: orderData.order.quantity }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
