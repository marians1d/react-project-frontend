import { useOrderContext } from '../../../contexts/Order';
import { OrderItem } from '../OrderItem/OrderItem';

import styles from './OrderList.module.css';

export const OrderList = () => {
    const { orders } = useOrderContext();

    return (
        <div className={styles['order-list']}>
            { orders.length > 0
                ? orders.map(o => <OrderItem key={o._id} order={o} />)
                : <h3>Все още няма Поръчки</h3>
            }
        </div>
    );
};