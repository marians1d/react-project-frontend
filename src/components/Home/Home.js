import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from './Home.module.css';

export const Home = () => {
    const { isLogged } = useSelector(state => state.user);

    return (
        <section className="">
            <div className={styles.background}>
                <img src="https://www.sevensedie.it/images/collezioni/ada/Copertina-ADA.jpg" alt="Furniture" />
            </div>

            <div className={styles['info-wrap']}>

                <div className={styles.info}>
                    <h2>Поръчай мебели по поръчка</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, porro. Praesentium
                        dolore minus, quae temporibus atque, suscipit eaque ex aperiam, incidunt omnis tempora ill
                        um aliquid autem cupiditate
                    </p>

                    <div>
                        {isLogged
                            ? <>
                                <Link className={'btn btn-primary'} to='/orders/create'>
                                    Поръчай
                                </Link>
                            </>
                            : <>
                                <Link className={'btn btn-primary'} to="/register">
                                    Регистрация
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>

        </section>
    );
};