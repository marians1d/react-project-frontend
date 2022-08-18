import { CommentItem } from '../CommentItem/CommentItem';

export const CommentList = ({ comments }) => {
    return (
        <div>
            {comments.length === 0
                ? <h2>Все още няма коментари</h2>
                : <ul>
                    {comments.map(c => <CommentItem key={c._id} comment={c} />)}
                </ul>
            }
        </div>
    );
};
