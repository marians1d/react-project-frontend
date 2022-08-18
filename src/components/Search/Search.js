import { useState } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.css';

export const Search = ({ submitHandler, suggestionsHandler }) => {
    const [query, setQuery] = useState();

    const localHandler = (event) => {
        event.preventDefault();
        submitHandler(query);
    };

    const localSuggestionHandler = (event) => {
        setQuery(event.target.value);
        suggestionsHandler(event.target.value);
    };

    return (
        <div className='search'>
            <div className={classnames(styles.search)}>
                <form onSubmit={localHandler}>
                    <input onChange={localSuggestionHandler} name="search" autoComplete="off" />
                    <button>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>

                <ul className={styles.suggestions}>
                    <li>
                        { }
                    </li>
                </ul>
            </div>
        </div>

    );
};
