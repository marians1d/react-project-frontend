import { useSelector } from 'react-redux';
import { OrderItem } from '../OrderItem/OrderItem';
import { ClipLoader } from 'react-spinners';

import styles from './OrderList.module.css';

export const OrderList = () => {
    const { orders, isLoading } = useSelector(state => state.orders);

    let component;

    if (isLoading) {
        component = <div className={styles['spinner']} ><ClipLoader /></div>;
    } else if (orders.length > 0) {
        component = orders.map(o => <OrderItem key={o._id} order={o} />);
    } else {
        component = <h3>Все още няма Поръчки</h3>;
    }

    return (
        <div className={styles['order-list']}>
            {component}
        </div>
    );
};