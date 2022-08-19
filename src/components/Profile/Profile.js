import { createRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './Profile.module.css';

import * as authService from '../../services/auth';
import { updateUser } from '../../features/auth/authSlice';

export const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const fileRef = createRef();

    const handleFile = (event) => {
        fileRef.current.click();
    };


    const handleUploadFile = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('profileImage', event.target.files[0]);
        authService.setImage(data).then((response) => {
            dispatch(updateUser({ profileImageUrl: response.profileImageUrl}));
        });
    };


    return (
        <div>
            <div className={styles.image}>
                <img src={user.profileImageUrl} alt="" />
            </div>

            <input onChange={handleUploadFile} type={'file'} ref={fileRef} />

            <button onClick={handleFile}>Постави</button>
        </div>
    );
};