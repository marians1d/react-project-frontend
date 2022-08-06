import { useOrderContext } from '../../../contexts/Order';

export const OrderList = () => {
    const { orders } = useOrderContext();

    return (
        <>
            { orders.map(order => <p key={order._id}>{order.title}</p>) }
        </>
    );
};