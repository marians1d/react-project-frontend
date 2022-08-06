import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import * as orderService from '../services/order';

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDERS':
            return action.payload.map(o => ({...o, comments: []}));
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
};