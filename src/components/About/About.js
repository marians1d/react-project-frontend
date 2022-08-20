import styles from './About.module.css';

export const About = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.about}>
                <h2>Малко за нас</h2>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Sint nulla deleniti quae adipisci in
                    fuga nemo reprehenderit deserunt nam aliquam eum
                    id neque quia ipsum quam odio ducimus, molestias libero?
                </p>
            </div>
        </div>
    );
};