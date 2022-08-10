import { useParams, useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../../contexts/Order';
import { OrderForm } from '../OrderForm/OrderForm';

import * as orderService from '../../../services/order';


export const EditOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { selectOrder, addOrder } = useOrderContext();
    const order = selectOrder(orderId);

    const orderHandler = (fields) => {
        orderService.edit(orderId, fields)
            .then((data) => {
                addOrder(data);

                navigate(`/orders/${data._id}`);
            })
            .catch(() => {
                navigate('/404');
            });
    };

    return (
        <section className="edit-order">
            <OrderForm title={'Редактиране Поръчка'} submitHandler={orderHandler} order={order} />
        </section>
    );
};