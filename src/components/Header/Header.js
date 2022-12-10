import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './Header.module.css';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export const Header = () => {   
    const { isLogged } = useSelector(state => state.user);

    const [activeNav, setActiveNav] = useState(false);

    const toggleHandler = () => {
        setActiveNav(oldState => !oldState);
    };

    return (
        <div className={classNames(styles['header-wrapper'], { [styles.open]: activeNav })}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <h2>
                        Дрийм стил
                    </h2>
                </Link>

                <FontAwesomeIcon onClick={toggleHandler} className={classNames(styles.hamburger)} icon={faHamburger} />

                <ul className={classNames(styles.links)}>
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
                    {isLogged
                        ? <div className={styles.right}>
                            <Link className={'btn btn-primary'} to='/orders/create'>
                                Поръчай
                            </Link>
                            <ProfileDropdown />
                        </div>
                        : <>
                            <Link className={'btn btn-secondary'} to="/login">
                                Вход
                            </Link>
                            <Link className={'btn btn-primary'} to="/register">
                                Регистрация
                            </Link>
                        </>
                    }
                </div>
            </header>
        </div>
    );
};