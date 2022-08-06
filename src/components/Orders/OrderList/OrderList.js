import { useOrderContext } from '../../../contexts/Order';
import { OrderItem } from '../OrderItem/OrderItem';

export const OrderList = () => {
    const { orders } = useOrderContext();

    return (
        <>
            { orders.length > 0
                ? orders.map(o => <OrderItem key={o._id} order={o} />)
                : <h3>Все още няма Поръчки</h3>
            }
        </>
    );
};