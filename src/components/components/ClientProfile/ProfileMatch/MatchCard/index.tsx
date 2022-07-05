import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../app/hooks';
import { rootDomain } from '../../../../../constants';
import { addMalling, getMatch, questionnairesSelector, removeMalling, viewMatch } from '../../../../../features/questionnairesSlice';
import { MatchCardT } from '../../../../../types';
import { MatchT } from '../../../../../types/questionnaires';
import generateID from '../../../../../utils/generateID';
import Avatar from '../../../../UIKit/Avatar';
import Button from '../../../../UIKit/Button';
import CircleProgressBar from './CircleProgressBar';
import styles from './styles.module.scss';

type PropsT = {
    card: MatchT,
    openSidebar: () => void
}

function MatchCard({card, openSidebar}:PropsT) {
    const dispatch = useAppDispatch();
    const userID = useParams();

    const handleAddMalling = (event:any) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        dispatch(addMalling({
            questionnaire_id: card.questionnaire_id,
            add_questionnaire_id: card.with_questionnaire_id
        }))
    }

    const handleRemoveMalling= (event:any) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        dispatch(removeMalling({
            questionnaire_id: card.questionnaire_id,
            added_questionnaire_id: card.with_questionnaire_id
        }))
    }


    const info = [
        {
            field: 'Внешность',
            value: card.match.appearance
        },
        {
            field: 'Качества',
            value: card.match.personal_qualities
        },
        {
            field: 'Анкета',
            value: card.match.form
        },
        {
            field: 'Тест',
            value: card.match.test
        },
        {
            field: 'О себе',
            value: card.match.about_me
        }
    ]

    return(
        <div
            className={styles.cardWrapper}
            onClick={() => {
                openSidebar();
                dispatch(viewMatch({
                    questionnaire_id: card.questionnaire_id,
                    with_questionnaire_id: card.with_questionnaire_id
                }))
            }}
        >
        <div className={styles.header}>
            {card.photo ?
                <div className={styles.imgContainer}>
                    <img src={card.photo ? `${rootDomain}/${card.photo}` : ''} />
                </div>
                :
                <div className={styles.imgContainer}>
                    <Avatar
                        logoClass={styles.logoFill}
                        logoFontSize={'16px'}
                        value={card.name}
                    />
                </div>
            }
            <div className={styles.nameAndCityContainer}>
                <span className={styles.name}>{card.name}</span>
                <span className={styles.city}>{card.city}</span>
            </div>
        </div>
        <div className={styles.contentWrapper}>
            <div className={styles.content}>
                    {info.map((item) => (
                        <div className={styles.item} key={generateID()}>
                            <CircleProgressBar item={{...item, value: item.value.toString()}}/>
                            <span>
                                {item.field}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
        {/* {   !card.in_mailing ?
                <Button className={styles.downloadPresentButton} onClick={handleAddMalling}>
                    <span>Добавить в рассылку</span>
                </Button>
            :
                <Button className={styles.downloadPresentButton} onClick={handleRemoveMalling}>
                    <span>Удалить из рассылки</span>
                </Button>
        } */}
    </div>

    )
}

export default MatchCard;