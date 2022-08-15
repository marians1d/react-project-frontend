import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { useFormFields } from '../../hooks/useFormFields';

import { AuthContext } from '../../contexts/Auth';
import * as authService from '../../services/auth';

import styles from './Login.module.css';

export const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        fields,
        fieldChange,
        errorHandler,
        hasErrors,
    } = useFormFields({
        email: { value: '' },
        password: { value: '' },
    });

    const touchedAll = fields.email.value !== '' && fields.password.value !== '';

    const loginHandler = (event) => {
        event.preventDefault();

        authService.login(fields.email.value, fields.password.value)
            .then(authData => {
                if (authData.status !== 'error') {
                    loginUser(authData);
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                navigate('/404');
            });
    };

    const checkError = (event) => {
        let error;

        if (event.target.value === '') {
            return errorHandler(event, 'required');
        }

        switch (event.target.id) {
            case 'email':
                error = !validator.isEmail(event.target.value);
                break;
            case 'password':
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
                <h4>Вход</h4>
                <form onSubmit={loginHandler}>
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

                    <button disabled={!touchedAll && hasErrors} className='btn btn-primary'>Влез</button>

                    <p>Все още нямате профил <Link to='/register'>Регистрация</Link></p>
                </form>
            </div>
        </div>
    );
};