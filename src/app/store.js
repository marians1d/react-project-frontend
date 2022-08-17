import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';

export default configureStore({
    reducer: { 
        user: authReducer,
        orders: orderReducer,
    },
});