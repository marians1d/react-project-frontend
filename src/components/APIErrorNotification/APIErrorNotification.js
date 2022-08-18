import { useDispatch, useSelector } from 'react-redux';
import styles from './APIErrorNotification.module.css';
import { remove } from '../../features/error/errorSlice';

export const APIErrorNotification = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    const handleSubmit = () => {
        dispatch(remove());
    };

    return (
        <>
            {!!error &&
                <div
                    className={styles.modal}
                    onClick={handleSubmit}
                >

                    <div className={styles.body}>
                        {error && error.message && <p>{error.message}</p>}
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            Ok
                        </button>
                    </div>
                </div>
            }
        </>

    );
};
