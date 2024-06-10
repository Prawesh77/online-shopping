import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import productReducer from './productSlice/productSlice';
import cartReducer from './CartSlice/cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

export default store;