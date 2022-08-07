import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const [showDropdown, setDropdown] = useState(false);

    const handleDropdown = () => setDropdown((old) => !old);

    return (
        <div className={styles.profile}>
            <button className={styles.icon} onClick={handleDropdown}>
                <FontAwesomeIcon icon={faUserAstronaut} />
            </button>

            {showDropdown && <div className={styles.dropdown}>
                <Link className={styles.link} to='/profile'>
                    Профил
                </Link>

                <Link className={styles.link} to="/logout">
                    Излез
                </Link>
            </div>}
        </div>
    );
};