import styles from './CommentItem.module.css';

export const CommentItem = ({ comment }) => {
    return (
        <li className={styles.comment}>
            <div className={styles.author}>
                <p>От {comment.userId.username}</p>
            </div>
            <div className={styles.content}>
                <p>{comment.text}</p>
            </div>
        </li>
    );
};