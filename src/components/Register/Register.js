import { useFormFields } from '../../hooks/useFormFields';

import * as authService from '../../services/auth';

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
        <div>
            <form onSubmit={registerHandler}>
                <label htmlFor="username">Потребителско име</label>
                <input value={fields.username} onChange={handleFieldChange} id='username' type="text" />
                <label htmlFor="email">Имейл</label>
                <input value={fields.email} onChange={handleFieldChange} id='email' type="text" />
                <label htmlFor="password">Парола</label>
                <input value={fields.password} onChange={handleFieldChange} id='password' type="password" />

                <button>Регистрация</button>
            </form>
        </div>
    );
};