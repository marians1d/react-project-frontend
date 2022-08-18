import styles from './NoMatch.module.css';

export const NoMatch = () => {
    return (
        <section className={styles['not-found']}>
            <h2>404</h2>

            <p>Страницата не е намерена</p>
        </section>
    );
};