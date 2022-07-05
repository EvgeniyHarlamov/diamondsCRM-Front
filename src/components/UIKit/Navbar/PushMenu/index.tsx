import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { clearNotifications, getNotifications, notificationsSelector } from '../../../../features/notificationsSlice';
import { NotificationT } from '../../../../types/questionnaires';
import Separator from '../../Separator';
import Message from './Message';
import styles from './styles.module.scss';

function PushMenu() {
    const dispatch = useAppDispatch();


    const notifications = useAppSelector(notificationsSelector).notification.notifications;
    const count = useAppSelector(notificationsSelector).notification.count;
    const isFetched = useAppSelector(notificationsSelector).notificationFetched;


    return(
        <div
            className={styles.wrapper}
        >
            <div className={styles.titleWrapper}>
                <div className={styles.titleContainer}>
                    <span
                        className={styles.title}
                    >
                        Уведомления
                    </span>
                    <span
                        className={styles.clear}
                        onClick={() => dispatch(clearNotifications({}))}
                    >
                        Очистить
                    </span>
                </div>
            </div>
            <div>
            <Separator/>

            {count > 0 ?
                notifications.map((notification:NotificationT) => {
                    <Message notification = {notification}/>
                })
                :
                <div className={styles.nothing}>Нет уведомлений</div>
            }
            </div>

        </div>
    )
}

export default PushMenu;