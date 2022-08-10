import { useParams } from 'react-router-dom';
import { useOrderContext } from '../../../contexts/Order';
import { OrderForm } from '../OrderForm/OrderForm';


export const EditOrder = () => {
    const { orderId } = useParams();
    const { selectOrder } = useOrderContext();
    const order = selectOrder(orderId);

    const orderHandler = (fields) => {
        orderService.create(fields)
            .then((data) => {
                addOrder(data);

                console.log(data);
                
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