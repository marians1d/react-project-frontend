import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { OrderForm } from '../OrderForm/OrderForm';
import { addOne, edit } from '../../../features/order/orderSlice';

import * as orderService from '../../../services/order';
import { useEffect, useState } from 'react';
import { add } from '../../../features/error/errorSlice';

export const EditOrder = () => {
    const [order, setOrder] = useState(false);
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        orderService
            .getOne(orderId)
            .then((order) => {
                setOrder(order);

                dispatch(edit(order));
            });
    }, [orderId, dispatch]);

    const orderHandler = (fields) => {
        orderService.edit(orderId, fields)
            .then((data) => {
                dispatch(addOne(data));

                navigate(`/orders/${data._id}`);
            })
            .catch((err) => {
                dispatch(add(err));
            });
    };

    return (
        <section className="edit-order">
            {
                order &&
                <OrderForm title={'Редактиране Поръчка'} submitHandler={orderHandler} order={order} />
            }
        </section>
    );
};