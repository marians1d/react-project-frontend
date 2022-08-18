import styles from './Comments.module.css';

export const Comments = () => {
    return (
        <section className={styles.comments}>
            <form>
                <label htmlFor="comment"></label>
                <textarea name="comment" id="comment" />
            </form>

            
        </section>
    );
};
