import React from 'react';
import styles from './styles.module.scss';

type PropsT = {
    text?: string
}

function NotFound({text = 'Ничего не найдено'}:PropsT) {
    return(
        <div className={styles.wrapper}>
            <span>{text}</span>
        </div>
    )
}

export default NotFound;