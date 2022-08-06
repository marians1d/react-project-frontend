import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Auth';
import styles from './Header.module.css';

export const Header = () => {
    const { user } = useAuthContext();

    return (
        <div className={styles['header-wrapper']}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <h2>
                        Дрийм стил
                    </h2>
                </Link>

                <ul className={styles.links}>
                    <li><NavLink to="/" ><em>Home</em></NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>

                <div className={styles.actions}>
                    {user.email
                        ? <>
                            <Link to="/profile">
                                <p>
                                    Профил
                                </p>
                            </Link>
                            <Link to="/logout">
                                <p>
                                    Излез
                                </p>
                            </Link>
                        </>
                        : <>
                            <Link to="/login">
                                <p>
                                    Вход
                                </p>
                            </Link>
                            <Link to="/register">
                                <p>
                                    Регистрация
                                </p>
                            </Link>
                        </>}


                </div>
            </header>
        </div>
    );
};