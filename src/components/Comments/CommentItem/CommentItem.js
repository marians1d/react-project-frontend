import classNames from 'classnames';

import styles from './CommentItem.module.css';

export const CommentItem = ({ comment }) => {
    return (
        <li className={styles.comment}>
            <div className={classNames(styles.image, 'icon')}>
                <img src={comment.userId.profileImageUrl} alt="" />
            </div>
            <div className={styles.text}>
                <p className={styles.author}>От {comment.userId.username}</p>
                <p className={styles.content}>{comment.text}</p>
            </div>
        </li>
    );
};