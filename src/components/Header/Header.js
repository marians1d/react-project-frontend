import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { Profile } from './Profile/Profile';

export const Header = () => {   
    const user = useSelector(state => state.user);

    return (
        <div className={styles['header-wrapper']}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <h2>
                        Дрийм стил
                    </h2>
                </Link>

                <ul className={styles.links}>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                            to="/"
                        >
                            Начало
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                            to="/orders"
                        >
                            Поръчки
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                            to="/about"
                        >
                            За Нас
                        </NavLink>
                    </li>
                </ul>

                <div className={styles.actions}>
                    {user.email
                        ? <div className={styles.right}>
                            <Link className={'btn btn-primary'} to='/orders/create'>
                                Поръчай
                            </Link>
                            <Profile />
                        </div>
                        : <>
                            <Link className={'btn btn-secondary'} to="/login">
                                Вход
                            </Link>
                            <Link className={'btn btn-primary'} to="/register">
                                Регистрация
                            </Link>
                        </>}


                </div>
            </header>
        </div>
    );
};