import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import productReducer from './productSlice/productSlice';
import cartReducer from './CartSlice/cartSlice';
import orderReducer from './OrderSlice/orderSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer
    },
});

export default store;