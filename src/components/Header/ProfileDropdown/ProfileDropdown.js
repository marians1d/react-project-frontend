import { useSelector } from 'react-redux';

import styles from './ProfileDropdown.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProfileDropdown = () => {
    const user = useSelector(state => state.user);
    const [showDropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown((old) => !old);

    const close = () => {
        setDropdown(false);
    };

    return (
        <div className={styles.profile}>
            <button className={styles.icon} onClick={toggleDropdown} >
                <img src={user.profileImageUrl} alt="" />
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