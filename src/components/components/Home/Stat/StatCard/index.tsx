import React from 'react';
import styles from './styles.module.scss';

type PropsT = {
    iconSrc: string,
    counter: {
        counter: number,
        color: string,
    },
    title: string,
    className?: string
}

function StatCard({iconSrc, counter, title, className}:PropsT) {
    return (
        <div className={`${styles.cardWrapper} ${className ? className : ''}`}>
            <div className={styles.cardContainer}>
                <div className={styles.infoWrapper}>
                    <div className={styles.icon}>
                        <img src={iconSrc}/>
                    </div>
                    <div className={styles.counter} style={{color: counter.color}}>
                        {counter.counter}
                    </div>
                </div>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatCard;