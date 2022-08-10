import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/Auth';

import { useOrderContext } from '../../../contexts/Order';
import * as orderService from '../../../services/order';

export const OrderDetails = () => {
    const navigate = useNavigate();
    const { selectOrder, fetchOrderDetails, removeOrder } = useOrderContext();
    const { orderId } = useParams();
    const { user } = useAuthContext();


    const currentOrder = selectOrder(orderId);

    const isOwner = currentOrder._ownerId === user._id;

    useEffect(() => {
        Promise.all([
            orderService.getOne(orderId),
        ]).then(([order]) => {


            fetchOrderDetails(orderId, order);
        });
    }, [orderId, fetchOrderDetails]);

    const orderDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            orderService.del(orderId)
                .then(() => {
                    removeOrder(orderId);
                    navigate('/orders');
                });
        }
    };


    return (
        <div>
            <h2>{currentOrder.title}</h2>

            {isOwner && <>
                <Link to={`/orders/${currentOrder._id}/edit`}>Редактиране</Link>
                <button onClick={orderDeleteHandler}>Изтрий</button>
            </>}
        </div>
    );
};