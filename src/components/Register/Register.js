import { Link } from 'react-router-dom';
import { useFormFields } from '../../hooks/useFormFields';

import * as authService from '../../services/auth';

import styles from './Register.module.css';

export const Register = () => {
    const [fields, handleFieldChange] = useFormFields({
        username: '',
        email: '',
        password: ''
    });

    const registerHandler = (event) => {
        event.preventDefault();

        authService.register(fields.username, fields.email, fields.password)
            .then(authData => {
                console.log(authData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles['form-wrap']}>
            <div className={styles.form}>
                <h4>Регистрация</h4>
                <form onSubmit={registerHandler}>
                    <label htmlFor="username">Потребителско име</label>
                    <input value={fields.username} placeholder='Иван Вазов' onChange={handleFieldChange} id='username' type="text" />
                    <label htmlFor="email">Имейл</label>
                    <input value={fields.email} placeholder='ivan@abv.bg' onChange={handleFieldChange} id='email' type="text" />
                    <label htmlFor="password">Парола</label>
                    <input value={fields.password} placeholder='12345678' onChange={handleFieldChange} id='password' type="password" />

                    <button className='btn btn-primary'>Регистрирай се</button>

                    <p>Вече имате регистрация <Link to='/login'>Вход</Link></p>
                </form>
            </div>
        </div>
    );
};