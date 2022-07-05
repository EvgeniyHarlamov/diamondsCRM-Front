import React from 'react';
import { useHistory } from 'react-router';
import { NotificationT } from '../../../../../types/questionnaires';
import styles from './styles.module.scss';

type PropsT = {
    notification: NotificationT
}

function Message({notification}:PropsT) {
    const history = useHistory();
    const type = notification.type === 'questionnaires' ? '' : '';

    return(
        <div className={styles.container}>
            <div className={styles.dateWrapper}>
                <span  className={styles.date}>{notification.created_at}</span>
            </div>
            <div className={styles.textWrapper}>
                <span className={styles.text}>{notification.message}</span>
            </div>
            <button
                className={styles.button}
                onClick={() => history.push(`/`)}
            >
                Открыть Анкету
            </button>
        </div>
    )
}

export default Message;