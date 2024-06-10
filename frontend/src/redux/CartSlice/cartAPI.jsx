import axios from 'axios';

const API_URL_LOAD = 'http://localhost:5000/cart';
const API_URL_ADDTOCART = 'http://localhost:5000/cart/addtocart';

const addToCart = async (productToCart) => {
    const response = await axios.post(API_URL_ADDTOCART,productToCart);
    return response;
};
const loadCart = async (userId) => {
    console.log(userId);
    const response = await axios.get(`${API_URL_LOAD}?userId=${userId}`);
    return response;
};


const cartAPI = { addToCart, loadCart };

export default cartAPI;