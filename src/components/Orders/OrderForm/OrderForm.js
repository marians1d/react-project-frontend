// import { useOrderContext } from '../../../contexts/Order';
import { useFormFields } from '../../../hooks//useFormFields';

export const OrderForm = () => {
    // const { orders } = useOrderContext();
    const [fields, handleFieldChange] = useFormFields({
        title: '',
        description: '',
        address: '',
        imageUrl: '',
        visibility: '',
    });

    const orderHandler = (e) => {
        e.preventDefault();

        console.log(fields);
    };


    return (
        <div>
            <form onSubmit={orderHandler}>
                <label htmlFor="title">Заглавие</label>
                <input value={fields.title} onChange={handleFieldChange} id='title' type="text" />
                <label htmlFor="description">Описание</label>
                <textarea value={fields.description} onChange={handleFieldChange} id='description' />
                <label htmlFor="address">Адрес</label>
                <input value={fields.address} onChange={handleFieldChange} id='address' type="text" />
                <label htmlFor="image">Снимка</label>
                <input value={fields.imageUrl} onChange={handleFieldChange} id='imageUrl' type="text" />

                <div onChange={handleFieldChange}>
                    
                    <label>
                        <input defaultChecked onChange={handleFieldChange} type="radio" value='public' id='visibility' name='visibility' />
                        Публична
                    </label>
                    <label>
                        <input onChange={handleFieldChange} type="radio" value='private' id='visibility' name='visibility' />
                        Частна
                    </label>
                </div>

                <button>Сездай</button>
            </form>
        </div>
    );
};