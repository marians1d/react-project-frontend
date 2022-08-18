import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Comments.module.css';
import * as commentService from '../../services/comment';
import { addComment } from '../../features/order/orderSlice';

import { CommentList } from './CommentList/CommentList';

export const Comments = ({ orderId, comments }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleComment = (e) => {
        e.preventDefault();

        if (comment.length !== 0) {
            commentService.create(orderId, comment)
                .then((result) => {
                    dispatch(addComment(result));

                    setComment('');
                });
        }
    };

    const commentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <section className={styles.comments}>
            {user._id &&
                <form onSubmit={handleComment}>
                    <label htmlFor="comment">Коментирай</label>
                    <textarea value={comment} onChange={commentChange} name="comment" id="comment" />
                    <button disabled={comment.length === 0} className='btn btn-primary'>Изпрати</button>
                </form>
            }

            <CommentList comments={comments} />
        </section>
    );
};
