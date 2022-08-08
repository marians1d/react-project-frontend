import { useNavigate } from 'react-router-dom';

import { OrderForm } from '../OrderForm/OrderForm';
import * as orderService from '../../../services/order';

import { useOrderContext } from '../../../contexts/Order';


export const CreateOrder = () => {
    const navigate = useNavigate();
    const { addOrder } = useOrderContext();

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
        <div>
            <OrderForm type={'create'} submitHandler={orderHandler} />
        </div>
    );
};