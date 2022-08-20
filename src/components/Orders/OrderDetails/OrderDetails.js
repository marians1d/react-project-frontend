import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import * as orderService from '../../../services/order';
import { remove, edit } from '../../../features/order/orderSlice';

import { Comments } from '../../Comments/Comments';

import styles from './OrderDetails.module.css';

export const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.orders.find(order => order._id === orderId)) || {};

    const isOwner = order?.ownerId?._id === user._id;

    useEffect(() => {
        orderService
            .getOne(orderId)
            .then((result) => {
                dispatch(edit(result));
            });
    }, [orderId, dispatch]);

    const orderDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            orderService.del(orderId)
                .then(() => {
                    dispatch(remove(orderId));
                    navigate('/orders');
                });
        }
    };


    return (
        <div className={styles.container}>
            <section className={styles.details}>
                <div className={styles.image}>
                    <img src={order?.imageUrl} alt={order?.title} />
                </div>

                <div className={styles.info}>
                    <h2>{order?.title}</h2>

                    <p>{order?.description}</p>

                    <div className={styles.author}>
                        <div className={classNames(styles.icon,'icon')}>
                            <img src={order?.ownerId?.profileImageUrl} alt={order?.ownerId?.profileImageUrl} />
                        </div>
                        <div className={styles['author-info']}>
                            <p>От {order?.ownerId?.username}</p>
                        </div>
                    </div>

                    {isOwner && <div className={styles.actions}>
                        <Link className='btn btn-primary' to={`/orders/${order?._id}/edit`}>Редактиране</Link>
                        <button className='btn btn-primary' onClick={orderDeleteHandler}>Изтрий</button>
                    </div>}
                </div>
            </section>

            <Comments orderId={orderId} comments={order?.comments || []} />
        </div>
    );
};