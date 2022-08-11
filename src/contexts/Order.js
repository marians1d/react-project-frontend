import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as orderService from '../services/order';

export const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDERS':
            return action.payload.map(o => ({...o, comments: []}));
        case 'ADD_ORDER':
            return [...state, action.payload];
        case 'FETCH_ORDER_DETAILS':
            return state.map(x => x._id === action.orderId ? action.payload : x);
        case 'REMOVE_ORDER':
            return state.filter(x => x._id !== action.orderId);
        case 'EDIT_ORDER':
            return state.map(x => x._id === action.orderId ? action.payload : x);
        default:
            return state;
    }
};

export const OrderProvider = ({
    children
}) => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [orders, dispatch] = useReducer(orderReducer, []);

    useEffect(() => {
        setLoading(true);

        orderService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_ORDERS',
                    payload: result
                };

                dispatch(action);

                setLoading(false);
            });
    }, []);

    

    const selectOrder = useCallback((orderId) => {
        return orders.find(x => x._id === orderId) || {};
    }, [orders]);

    const fetchOrderDetails =  useCallback(async (orderId, orderDetails) => {
        dispatch({
            type: 'FETCH_ORDER_DETAILS',
            payload: orderDetails,
            orderId,
        });
    }, []);

    const addOrder = useCallback((orderData) => {
        dispatch({
            type: 'ADD_ORDER',
            payload: orderData,
        });

        navigate('/orders');
    }, [navigate]);

    const editOrder = useCallback((orderId, orderData) => {
        dispatch({
            type: 'EDIT_ORDER',
            payload: orderData,
            orderId,
        });
    }, []);

    const removeOrder = useCallback((orderId) => {
        dispatch({
            type: 'REMOVE_ORDER',
            payload: orderId,
        });
    }, []);

    return (
        <OrderContext.Provider value={{
            isLoading,
            orders,
            addOrder,
            editOrder,
            selectOrder,
            fetchOrderDetails,
            removeOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    return context;
};