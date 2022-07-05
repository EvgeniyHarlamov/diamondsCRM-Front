import React from 'react';
import { InfoCardRowT } from '../../../../../../../types';
import styles from './styles.module.scss';

type PropsT = {
    row: InfoCardRowT
}

function Value({row}:PropsT) {
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.item}>
                <span>{row.value}</span>
            </div>
        </div>
    )
}

export default Value;