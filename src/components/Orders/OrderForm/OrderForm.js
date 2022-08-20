import { createRef, useState } from 'react';
import validator from 'validator';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { useFormFields } from '../../../hooks/useFormFields';
import styles from './OrderForm.module.css';
import { onLoading, offLoading } from '../../../features/loading/loadingSlice';
import * as orderService from '../../../services/order';

export const OrderForm = ({ type, submitHandler, order, title }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loading.orders);
    const [imageUrls, setImageUrls] = useState(order?.imageUrls || []);
    const fileRef = createRef();

    const {
        fields,
        fieldChange,
        errorHandler,
        hasErrors,
    } = useFormFields({
        title: { value: order?.title || '', error: false },
        description: { value: order?.description || '', error: false },
        address: { value: order?.address || '', error: false },
        visibility: { value: order?.visibility || 'public', error: false },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        submitHandler({
            title: fields.title.value,
            description: fields.description.value,
            address: fields.address.value,
            imageUrls: imageUrls,
            visibility: fields.visibility.value,
        });
    };

    const handleFile = (event) => {
        fileRef.current.click();
    };

    const handleUploadFile = (event) => {
        dispatch(onLoading('orders'));

        event.preventDefault();
        const data = new FormData();
        data.append('orderImage', event.target.files[0]);

        event.target.value = null;
        orderService.addFile(data).then((response) => {
            setImageUrls([...imageUrls, response.imageUrl]);

            setTimeout(() => {
                dispatch(offLoading('orders'));
            }, 1500);

        });
    };

    const touchedAll = fields.title.value !== '' && fields.description.value !== '' && fields.address.value !== '' && fields.visibility.value !== '';

    const checkError = (event) => {
        let error;

        if (event.target.value === '') {
            return errorHandler(event, 'required');
        }

        switch (event.target.id) {
            case 'title':
                error = !validator.isLength(event.target.value, { min: 3 });
                break;
            case 'description':
                error = !validator.isLength(event.target.value, { min: 10 });
                break;
            case 'address':
                error = !validator.isLength(event.target.value, { min: 5 });
                break;
            default:
                error = event.target.value === '' ? 'required' : false;
                break;
        }

        return errorHandler(event, error);
    };

    return (
        <div className={styles['form-wrap']}>
            <div className={styles.form}>
                <h4>{title}</h4>
                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="title">Заглавие</label>
                        <input value={fields.title.value} onChange={fieldChange} onBlur={checkError} id='title' type="text" />
                        {fields.title.error &&
                            <p>
                                {fields.title.error !== 'required'
                                    ? 'Заглавието трябва да е поне 3 символа'
                                    : 'Заглавието е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Описание</label>
                        <textarea value={fields.description.value} onChange={fieldChange} onBlur={checkError} id='description' />
                        {fields.description.error &&
                            <p>
                                {fields.description.error !== 'required'
                                    ? 'Описанието трябва да е поне 10 символа'
                                    : 'Описанието е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="address">Адрес</label>
                        <input value={fields.address.value} onChange={fieldChange} onBlur={checkError} id='address' type="text" />
                        {fields.address.error &&
                            <p>
                                {fields.address.error !== 'required'
                                    ? 'Адресът трябва да е поне 5 символа'
                                    : 'Адресът е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.radio}>
                        <label>
                            <input defaultChecked onChange={fieldChange} type="radio" value='public' id='visibility' name='visibility' />
                            Публична
                        </label>
                        <label>
                            <input onChange={fieldChange} type="radio" value='private' id='visibility' name='visibility' />
                            Частна
                        </label>
                    </div>

                    <div className={classNames(styles['image-section'])}>
                        <label htmlFor="image">Снимки</label>

                        {
                            imageUrls.map(image => {
                                return (
                                    <div className={styles.image}>
                                        <img src={image} alt={image} key={image} />
                                    </div>
                                );  
                            })
                        }

                        <input onChange={handleUploadFile} ref={fileRef} id='image' type="file" />
                        <button type={'button'} disabled={isLoading} className={classNames(styles.button, styles.image, 'btn', 'btn-primary')} onClick={handleFile}>Добави Снимка</button>
                    </div>

                    <button disabled={!touchedAll || hasErrors} className='btn btn-primary'>{type === 'create' ? 'Създай' : 'Запази'}</button>
                </form>
            </div>
        </div>
    );
};