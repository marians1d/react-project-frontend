import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Search } from '../../Search/Search';
import { OrderList } from '../OrderList/OrderList';
import * as orderService from '../../../services/order';
import { addAll, setLoading } from '../../../features/order/orderSlice';

export const OrdersPage = () => {
    const dispatch = useDispatch();

    const submitHandler = (value) => {
        console.log(value);
    };

    const suggestionsHandler = (value) => {
        console.log(value);
    };

    useEffect(() => {
        orderService.getAll()
            .then(result => {
                dispatch(addAll(result));

                dispatch(setLoading(false));
            });
    }, [dispatch]);

    return (
        <div className="order-page">
            <Search
                submitHandler={submitHandler}
                suggestionsHandler={suggestionsHandler}
            />
            <OrderList />
        </div>
    );
};