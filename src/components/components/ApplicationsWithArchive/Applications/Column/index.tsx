import React from 'react';
import styles from './styles.module.scss';
import CreateApplicationsCounterName from '../../../../../utils/CreateApplicationsCounterName';

type PropsT = {
    style: string,
    title: string,
    desc: number
}

function Column({style, title, desc}:PropsT) {
        return(
        <div className={styles.columnWrapper + ' ' + styles[style]}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>
                {CreateApplicationsCounterName(desc)}
            </div>
        </div>
    );
}

export default Column;