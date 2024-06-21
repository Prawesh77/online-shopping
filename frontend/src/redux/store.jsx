import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import productReducer from './productSlice/productSlice';
import cartReducer from './CartSlice/cartSlice';
import orderReducer from './OrderSlice/orderSlice';
import categoryReducer from './categorySlice/categorySlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        categories: categoryReducer,
    },
});

export default store;