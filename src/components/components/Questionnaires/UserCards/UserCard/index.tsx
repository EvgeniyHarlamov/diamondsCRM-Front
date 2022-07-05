import React, { useEffect, useState } from 'react';
import { dispatch } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../../../app/hooks';
import { domain, rootDomain } from '../../../../../constants';
import { startWork } from '../../../../../features/applicationsSlice';
import { QuestionnairesCard } from '../../../../../types';
import { GridSearchCardT } from '../../../../../types/questionnaires';
import Avatar from '../../../../UIKit/Avatar';
import Button from '../../../../UIKit/Button';
import ServiceStatus from '../../../../UIKit/ServiceStatus';
import styles from './styles.module.scss';

type PropsT = {
    card: GridSearchCardT,
}

function UserCard({card}:PropsT) {
    const dispatch = useAppDispatch();
    const history = useHistory();

    return(
        <div
            className={styles.cardWrapper}
            onClick={() => history.push(`/questionnaires/${card.id}`)}
        >
                <div className={styles.MainInfoWrapper}>
                    <div className={styles.AvatarAndServiceContainer}>
                        {card.photo ?
                            <div className={styles.avatar}>
                                <img src={card.photo ? `${rootDomain}/${card.photo}` : ''} />
                            </div>
                            :
                            <Avatar
                                logoClass={styles.logoFill}
                                logoFontSize={'32px'}
                                value={card.name}
                            />
                        }
                        {card.service_type &&
                            <ServiceStatus service={card.service_type}/>
                        }
                    </div>
                    <div className={styles.name}>
                        {card.name}
                    </div>
                </div>
                <div className={styles.infoFieldContainer}>
                    <span className={styles.field}>Национальность</span>
                    <span className={styles.fieldValue}>{card.ethnicity}</span>
                </div>
                <div className={styles.infoFieldContainer}>
                    <span className={styles.field}>Возраст</span>
                    <span className={styles.fieldValue}>{card.age}</span>
                </div>
                {card.country ? <div className={styles.infoFieldContainer}>
                    <span className={styles.field}>Страна</span>
                    <span className={styles.fieldValue}>{card.country}</span>
                </div> : ''}
                <div className={styles.infoFieldContainer}>
                    <span className={styles.field}>Город</span>
                    <span className={styles.fieldValue}>{card.city}</span>
                </div>
                    <div className={styles.avatarWrapper}>
                        {
                        card.responsibility ?
                            <Avatar
                                value={card.responsibility.split(',')[1]}
                                showSignature
                                fontSize={'14px'}
                                className={styles.avatar}
                            />
                            :
                            <button
                                className={styles.button}
                                onClick={() => dispatch(startWork({id: card.id}))}
                                >
                                <span>Взять в работу</span>
                            </button>
                        }
                        <div className={styles.timeWrapper}>
                            <span className={styles.time}>{card.time}</span>
                        </div>
                    </div>
        </div>
    )
}

export default UserCard;