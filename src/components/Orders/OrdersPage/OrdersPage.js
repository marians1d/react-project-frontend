import { Search } from '../../Search/Search';
import { OrderList } from '../OrderList/OrderList';

export const OrdersPage = () => {
    const submitHandler = (value) => {
        console.log(value);
    };

    const suggestionsHandler = (value) => {
        console.log(value);
    };

    return (
        <div className="order-page">
            <Search
                submitHandler={submitHandler}
                suggestionsHandler={suggestionsHandler}
            />
            <OrderList />
        </div>
    );
};