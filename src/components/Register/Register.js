import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { useFormFields } from '../../hooks/useFormFields';
import { login } from '../../features/auth/authSlice';

import * as authService from '../../services/auth';

import styles from './Register.module.css';
import { add } from '../../features/error/errorSlice';

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fields, fieldChange, errorHandler, hasErrors } = useFormFields({
        username: { value: '' },
        email: { value: '' },
        password: { value: '' },
        rePass: { value: '' },
    });

    const [samePasswords, setSamePasswords] = useState(true);

    const touchedAll = fields.username.value !== '' && fields.email.value !== '' && fields.password.value !== '' && fields.rePass.value !== '';

    const registerHandler = (event) => {
        event.preventDefault();

        if (fields.password.value === fields.rePass.value) {
            authService.register(fields.username.value, fields.email.value, fields.password.value)
                .then(authData => {
                    dispatch(login(authData));
                    navigate('/');
                })
                .catch((error) => {
                    dispatch(add(error));
                });
        } else {
            setSamePasswords(false);
        }

    };

    const checkError = useCallback((event) => {
        let error;

        if (event.target.value === '') {
            return errorHandler(event, 'required');
        }

        if (event.target.id === 'rePass') {
            if (event.target.value !== fields.password.value) {
                setSamePasswords(false);
            } else {
                setSamePasswords(true);
            }
        }

        if (event.target.id === 'password' && fields.rePass.value !== '') {
            if (event.target.value !== fields.rePass.value) {
                setSamePasswords(false);
            } else {
                setSamePasswords(true);
            }
        }

        switch (event.target.id) {
            case 'username':
                error = !validator.isLength(event.target.value, { min: 3 });
                break;
            case 'email':
                error = !validator.isEmail(event.target.value);
                break;
            case 'password':
            case 'rePass':
                error = !validator.isLength(event.target.value, { min: 5 });
                break;
            default:
                error = event.target.value === '' ? 'required' : false;
                break;
        }

        return errorHandler(event, error);
    }, [errorHandler, fields]);

    return (
        <div className={styles['form-wrap']}>
            <div className={styles.form}>
                <h4>Регистрация</h4>
                <form onSubmit={registerHandler}>

                    <div className={styles.field}>
                        <label htmlFor="username">Потребителско име</label>
                        <input value={fields.username.value} onChange={fieldChange} onBlur={checkError} id='username' type="text" />
                        {fields.username.error &&
                            <p>
                                {fields.username.error !== 'required'
                                    ? 'Името трябва да е поне 5 символа'
                                    : 'Потребителското име е задължително'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Имейл</label>
                        <input value={fields.email.value} onChange={fieldChange} onBlur={checkError} id='email' type="text" />
                        {fields.email.error &&
                            <p>
                                {fields.email.error !== 'required'
                                    ? 'Невалиден Имейл'
                                    : 'Имейл е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Парола</label>
                        <input value={fields.password.value} onChange={fieldChange} onBlur={checkError} id='password' type="password" />
                        {fields.password.error &&
                            <p>
                                {fields.password.error !== 'required'
                                    ? 'Паролата трябва да е поне 5 символа'
                                    : 'Паролата е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="rePass">Потвърди Паролата</label>
                        <input value={fields.rePass.value} onChange={fieldChange} onBlur={checkError} id='rePass' type="password" />
                        <p>{samePasswords}</p>
                        {(fields.rePass.error || !samePasswords) &&
                            <p>
                                {!samePasswords && 'Паролите не съвпадат'}
                                {samePasswords &&
                                    'Паролата е задължително поле'
                                }
                            </p>
                        }
                    </div>

                    <button disabled={!samePasswords || !touchedAll || hasErrors} className='btn btn-primary'>Регистрирай се</button>

                    <p>Вече имате регистрация <Link to='/login'>Вход</Link></p>
                </form>
            </div >
        </div >
    );
};