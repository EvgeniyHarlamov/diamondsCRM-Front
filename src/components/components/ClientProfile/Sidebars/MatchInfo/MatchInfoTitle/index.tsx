import React from 'react';
import { useHistory } from 'react-router';
import { domain } from '../../../../../../constants';
import Button from '../../../../../UIKit/Button';
import styles from './styles.module.scss';

type PropsT = {
    name: string,
    matchPercent: string,
    link: number,
    closeSidebar: () => void
}

function MatchInfoTitle({name, matchPercent, closeSidebar,link}: PropsT) {
    const history = useHistory();

    return(
        <div className={styles.title}>
            <div className = {styles.nameWrapper}>
                <div className = {styles.nameContainer}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.matchPercent}>
                        {`Совпадает на ${matchPercent}%`}
                    </span>
                </div>
                <span onClick = {closeSidebar}>
                    <img className = {styles.closeBtn} role="img" src="/icons/close.svg"/>
                </span>
            </div>
            <Button
                className={styles.button}
                onClick={() => {
                    history.push(`/questionnaires/${link}`)
                    window.location.reload();
                }}
            >
                Открыть анкету
            </Button>
        </div>
    )
}

export default MatchInfoTitle;