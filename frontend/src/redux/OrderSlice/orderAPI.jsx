// src/services/orderAPI.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/order'; // Adjust to your backend URL

const placeOrder = async (orderData) => {
    console.log(orderData);
    const response = await axios.post(BASE_URL, orderData);
    return response;
  }
const orderAPI= {placeOrder};

export default orderAPI;
