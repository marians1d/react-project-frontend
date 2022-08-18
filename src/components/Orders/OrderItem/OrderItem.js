import { Link } from 'react-router-dom';
import styles from './OrderItem.module.css';

export const OrderItem = ({ order }) => {

    return (
        <div className={styles['order-card']}>
            <Link to={`/orders/${order._id}`}>
                <div className={styles['image']}>
                    <img src={order.imageUrl} alt='Order' />
                </div>

                <div className={styles['body']}>
                    <h5>{order.title}</h5>
                    <p>От {order.ownerId.username}</p>
                </div>
            </Link>
        </div>
    );
};