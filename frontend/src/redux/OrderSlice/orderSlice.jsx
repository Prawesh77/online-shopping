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

export const getOrderStatusByIdAsync = createAsyncThunk('order/get-order', async(userid,{ rejectWithValue })=>{
  try{
    const response = await orderAPI.getOrderById(userid);
    console.log(response.data);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
})

export const getAllOrderAsync = createAsyncThunk('order/all-order-details', async()=>{
  try{
    console.log("Im in getAllOrderAsync");
    const response= await orderAPI.getAllOrder();
    return (response.data);
  }catch(err){
    return(err);
  }
})
export const setOrderStatusAsync = createAsyncThunk('order/update-status', async(toSet)=>{
  try{
    console.log("Im in setStatusAsync");
    await orderAPI.setOrderStatus(toSet);
  }catch(err){
    return(err);
  }
})

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    orderbyid:null,
    allorder:null,
    orderStatus: null,
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
      })
      .addCase(getOrderStatusByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getOrderStatusByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderbyid = action.payload;
      })
      .addCase(getAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allorder = action.payload;
      })
      .addCase(setOrderStatusAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  },
});

export default orderSlice.reducer;
