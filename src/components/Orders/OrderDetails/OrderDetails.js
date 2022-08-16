import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useOrderContext } from '../../../contexts/Order';
import * as orderService from '../../../services/order';

import styles from './OrderDetails.module.css';

export const OrderDetails = () => {
    const navigate = useNavigate();
    const { selectOrder, fetchOrderDetails, removeOrder, editOrder } = useOrderContext();
    const { orderId } = useParams();
    const user = useSelector(state => state.user.value);


    const currentOrder = selectOrder(orderId);

    const isOwner = currentOrder.ownerId?._id === user._id;

    useEffect(() => {
        Promise.all([
            orderService.getOne(orderId),
        ]).then(([order]) => {
            editOrder(orderId, order);

            fetchOrderDetails(orderId, order);
        });
    }, [orderId, fetchOrderDetails, editOrder]);

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
        <div className={styles.container}>
            <section className={styles.details}>
                <div className={styles.image}>
                    <img src={currentOrder.imageUrl} alt={currentOrder.title} />
                </div>

                <div className={styles.info}>
                    <h2>{currentOrder.title}</h2>

                    <p>{currentOrder.description}</p>

                    {isOwner && <div className={styles.actions}>
                        <Link className='btn btn-primary' to={`/orders/${currentOrder._id}/edit`}>Редактиране</Link>
                        <button className='btn btn-primary' onClick={orderDeleteHandler}>Изтрий</button>
                    </div>}
                </div>
            </section>
        </div>
    );
};