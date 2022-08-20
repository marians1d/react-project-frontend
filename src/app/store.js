import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import errorReducer from '../features/error/errorSlice';
import loadingReducer from '../features/loading/loadingSlice';

export default configureStore({
    reducer: { 
        user: authReducer,
        orders: orderReducer,
        error: errorReducer,
        loading: loadingReducer,
    },
});