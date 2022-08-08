import { useFormFields } from '../../../hooks//useFormFields';
import styles from './OrderForm.module.css';

export const OrderForm = ({ type, submitHandler, order }) => {
    const [fields, handleFieldChange] = useFormFields(order || {
        title: '',
        description: '',
        address: '',
        imageUrl: '',
        visibility: 'public',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        submitHandler(fields);
    };

    return (
        <div className={styles['form-wrap']}>
            <div className={styles.form}>
                <h4>{type === 'create' ? 'Създай Поръчка' : 'Поправи Поръчка'}</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Заглавие</label>
                    <input value={fields.title} onChange={handleFieldChange} id='title' type="text" />
                    <label htmlFor="description">Описание</label>
                    <textarea value={fields.description} onChange={handleFieldChange} id='description' />
                    <label htmlFor="address">Адрес</label>
                    <input value={fields.address} onChange={handleFieldChange} id='address' type="text" />
                    <label htmlFor="image">Снимка</label>
                    <input value={fields.imageUrl} onChange={handleFieldChange} id='imageUrl' type="text" />

                    <div className={styles.radio}>
                        <label>
                            <input defaultChecked onChange={handleFieldChange} type="radio" value='public' id='visibility' name='visibility' />
                            Публична
                        </label>
                        <label>
                            <input onChange={handleFieldChange} type="radio" value='private' id='visibility' name='visibility' />
                            Частна
                        </label>
                    </div>

                    <button className='btn btn-primary'>{type === 'create' ? 'Създай' : 'Запази'}</button>
                </form>
            </div>
        </div>
    );
};