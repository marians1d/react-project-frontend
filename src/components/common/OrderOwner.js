import { useSelector } from 'react-redux';
import { Outlet, useParams, Navigate } from 'react-router-dom';

const OrderOwner = ({ children }) => {
    const { orderId } = useParams();
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.orders.orders.find(order => order._id === orderId)) || {};

    if (!user.isLogged || order?.ownerId?._id !== user._id) {
        return <Navigate to='/orders' replace />;
    }

    return children ? children : <Outlet />;
};

export default OrderOwner;
