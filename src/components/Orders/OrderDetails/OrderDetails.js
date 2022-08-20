import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import * as orderService from '../../../services/order';
import { remove, edit } from '../../../features/order/orderSlice';

import { Comments } from '../../Comments/Comments';

import styles from './OrderDetails.module.css';

export const OrderDetails = () => {
    const [activeImage, setActiveImage] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.orders.find(order => order._id === orderId)) || {};

    const isOwner = order?.ownerId?._id === user._id;

    const nextImage = () => {
        if (order?.imageUrls && activeImage < order.imageUrls.length - 1) {
            setActiveImage((old) => old + 1);
        }
    };

    const prevImage = () => {
        if (activeImage > 0) {
            setActiveImage((old) => old - 1);
        }
    };

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

    let imageSection;

    if (!order?.imageUrls || order.imageUrls.length === 0) {
        imageSection = <img className={classNames(styles.image, styles.active)} src={'https://drive.google.com/uc?id=1I9jpeAJRiWcDfGpPth-zphUrFZdja-xe'} alt={'Default'} />;
    } else if (order.imageUrls.length === 1) {
        imageSection = <img className={classNames(styles.image, styles.active)} src={order.imageUrls[0]} alt={order.imageUrls[0]} />;
    } else {
        imageSection = <>
            <div onClick={prevImage} className={styles.prev}>
                <div className={classNames(styles.icon)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            </div>
            {
                order.imageUrls.map((image, i) => <img key={image} className={classNames(styles.image, i === activeImage ? styles.active : '')} src={image} alt={image} />)
            }
            <div className={styles.next}>
                <div onClick={nextImage} className={classNames(styles.icon)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </>;
    }

    return (
        <div className={styles.container}>
            <section className={styles.details}>
                <div className={styles['image-section']}>
                    {imageSection}
                </div>

                <div className={styles.info}>
                    <h2>{order?.title}</h2>

                    <p>{order?.description}</p>

                    <div className={styles.author}>
                        <div className={classNames(styles.icon, 'icon')}>
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