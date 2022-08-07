import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormFields } from '../../hooks/useFormFields';

import { AuthContext } from '../../contexts/Auth';
import * as authService from '../../services/auth';

import styles from './Login.module.css';

export const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });

    const loginHandler = (event) => {
        event.preventDefault();

        authService.login(fields.email, fields.password)
            .then(authData => {
                loginUser(authData);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                navigate('/404');
            });
    };

    return (
        <div className={styles['form-wrap']}>
            <div className={styles.form}>
                <h4>Вход</h4>
                <form onSubmit={loginHandler}>
                    <label htmlFor="email">Имейл</label>
                    <input value={fields.email} onChange={handleFieldChange} id='email' type="text" />
                    <label htmlFor="password">Парола</label>
                    <input value={fields.password} onChange={handleFieldChange} id='password' type="password" />

                    <button className='btn btn-primary'>Влез</button>

                    <p>Все още нямате профил <Link to='/register'>Регистрация</Link></p>
                </form>
            </div>
        </div>
    );
};