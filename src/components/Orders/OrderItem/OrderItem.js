import { Link } from 'react-router-dom';
import styles from './OrderItem.module.css';

export const OrderItem = ({ order }) => {
    return (
        <div className={styles['order-card']}>
            <Link to={`/orders/${order._id}`}>
                <div className={styles['image']}>
                    <img src={order?.imageUrls && order.imageUrls.length > 0 ? order?.imageUrls[0] : 'https://drive.google.com/uc?id=1I9jpeAJRiWcDfGpPth-zphUrFZdja-xe'} alt={order?.imageUrls ? 'Order' : 'Not found'} />
                </div>

                <div className={styles['body']}>
                    <div className={styles.text}>
                        <h5>{order.title}</h5>
                        <p>От {order.ownerId.username}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};