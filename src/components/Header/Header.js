import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
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
                </div>
            </header>
        </div>
    );
};