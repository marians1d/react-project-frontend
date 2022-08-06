import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import * as orderService from '../services/order';

export const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDERS':
            return action.payload.map(o => ({...o, comments: []}));
        case 'ADD_ORDER':
            return [...state, action.payload];
        default:
            return state;
    }
};

export const OrderProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [orders, dispatch] = useReducer(orderReducer, []);

    useEffect(() => {
        orderService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_ORDERS',
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const addOrder = (orderData) => {
        dispatch({
            type: 'ADD_ORDER',
            payload: orderData,
        });

        navigate('/orders');
    };

    return (
        <OrderContext.Provider value={{
            orders,
            addOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    return context;
};