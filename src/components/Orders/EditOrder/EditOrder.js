import { useParams } from "react-router-dom";
import { useOrderContext } from "../../../contexts/Order";
import { OrderForm } from "../OrderForm/OrderForm";


export const EditOrder = () => {
    const { orderId } = useParams();
    const { selectOrder } = useOrderContext();
    const order = selectOrder(orderId);

    return (
        <section className="edit-order">
            <OrderForm order={order} />
        </section>
    );
};