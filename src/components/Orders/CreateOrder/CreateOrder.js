import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { OrderForm } from '../OrderForm/OrderForm';
import * as orderService from '../../../services/order';
import { addOne } from '../../../features/order/orderSlice';

export const CreateOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const orderHandler = (fields) => {
        orderService.create(fields)
            .then((data) => {
                dispatch(addOne(data));

                navigate(`/orders/${data._id}`);
            })
            .catch(() => {
                navigate('/404');
            });
    };

    return (
        <div>
            <OrderForm type={'create'} title={'Създай Поръчка'} submitHandler={orderHandler} />
        </div>
    );
};