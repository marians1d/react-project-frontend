import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const user = useSelector(state => state.user);
    const [showDropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown((old) => !old);

    const close = () => {
        setDropdown(false);
    };

    return (
        <div className={styles.profile}>
            <button className={styles.icon} onClick={toggleDropdown} >
                <FontAwesomeIcon icon={faUserAstronaut} />
            </button>

            {showDropdown && <div className={styles.dropdown} onBlur={close}>
                <div onClick={close} className={styles.background}></div>

                <header className={styles.header}>
                    <p>Здравей, {user.username}</p>
                </header>
                <div className={styles.links}>
                    <Link onClick={toggleDropdown} className={styles.link} to='my-orders'>
                        Моите Поръчки
                    </Link>


                    <Link onClick={toggleDropdown} className={styles.link} to='/profile'>
                        Профил
                    </Link>

                    <Link onClick={toggleDropdown} className={styles.link} to="/logout">
                        Излез
                    </Link>
                </div>
            </div>}
        </div>
    );
};