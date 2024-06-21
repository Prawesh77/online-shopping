// src/services/orderAPI.js

import axios from 'axios';

const PLACE_ORDER_URL = 'http://localhost:5000/order'; // to place order
const GET_ORDER_BY_ID_URL ='http://localhost:5000/order/get-order' //get orders of specific user
const GET_ALL_ORDER_URL= 'http://localhost:5000/order/all-order-details' //gives all order based on status(accepted for admin profile and pending for bargaining)
const SET_ORDER_STATUS_URL= 'http://localhost:5000/order/update-status' //to set status of order

const placeOrder = async (orderData) => {
    console.log(orderData);
    const response = await axios.post(PLACE_ORDER_URL, orderData);
    return response;
  }
  const getOrderById = async (userid) => {
    console.log(userid);
    const response = await axios.post(GET_ORDER_BY_ID_URL, userid);
    return response;
  }
  const getAllOrder = async (query) => {
    console.log("Im in getAllOrder");
    const response = await axios.get(`${GET_ALL_ORDER_URL}${query}`);
    return response;
  }
  const setOrderStatus = async (toSet) => {
    console.log("Im in setOrderStatus", toSet);
    await axios.put(SET_ORDER_STATUS_URL,toSet);
  }

  

const orderAPI= {placeOrder, getOrderById, getAllOrder, setOrderStatus};

export default orderAPI;
