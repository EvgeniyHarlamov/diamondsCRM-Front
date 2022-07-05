import React, { useEffect, useState } from 'react';
import { InfoCardRowT } from '../../../../../../../types';
import styles from './styles.module.scss';

type PropsT = {
    row: InfoCardRowT
}

function FieldAndValue({row}:PropsT) {
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        if (row.value && typeof(row.value) !== 'boolean' && row.value.length > 30) {
            setIsLarge(true)
        }
    }, [])

    if (row.value) {
        return (
            <div className={!isLarge ? styles.row: styles.onelineRow}>
                <div className={styles.field}>
                    {row.field}
                </div>
                <div className={styles.value}>
                    <span>{row.value}</span>
                </div>
            </div>
        )
    }
    return (<div></div>)

}

export default FieldAndValue;