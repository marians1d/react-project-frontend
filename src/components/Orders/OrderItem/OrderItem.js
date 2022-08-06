import { Link } from 'react-router-dom';

export const OrderItem = ({ order }) => {

    return (
        <div className='order-card'>
            <Link to={`/orders/${order._id}`}>
                <div className='image'>
                    <img src={order.imageUrl} alt='Order' />
                </div>

                <div className='body'>
                    <h5>{order.title}</h5>
                </div>
            </Link>
        </div>
    );
};