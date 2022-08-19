import { createRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.css';

import * as authService from '../../services/auth';
import { updateUser } from '../../features/auth/authSlice';
import { offLoading, onLoading } from '../../features/loading/loadingSlice';
import classNames from 'classnames';

export const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const isLoading = useSelector(state => state.loading.user);
    const fileRef = createRef();

    const handleFile = (event) => {
        fileRef.current.click();
    };


    const handleUploadFile = (event) => {
        dispatch(onLoading('user'));

        event.preventDefault();
        const data = new FormData();
        data.append('profileImage', event.target.files[0]);
        authService.setImage(data).then((response) => {
            dispatch(updateUser({ profileImageUrl: response.profileImageUrl }));
            dispatch(offLoading('user'));
        });
    };


    return (
        <div className={styles.profile}>
            <section className={styles['image-section']}>
                <div className={styles.image}>
                    <img src={user.profileImageUrl} alt={user.profileImageUrl} />

                    <input className={styles.input} onChange={handleUploadFile} type={'file'} ref={fileRef} />

                    <button disabled={isLoading} className={classNames(styles.button, 'btn', 'btn-primary')} onClick={handleFile}><FontAwesomeIcon icon={faPenToSquare} /> Смени</button>

                    {isLoading &&
                        <div className={styles['spinner-background']}>
                            <div className={styles.spinner} ><ClipLoader /></div>
                        </div>
                    }
                </div>
            </section>

            <section className={styles.info}>
                <p>Потребителско име: {user?.username}</p>
                <p>Имейл: {user?.email}</p>
            </section>

        </div>
    );
};