import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { applicationsSelector } from '../../../../features/applicationsSlice';
import { getQuestionnaires, questionnairesSelector } from '../../../../features/questionnairesSlice';
import { QuestionnairesCard } from '../../../../types';
import { GridSearchCardT } from '../../../../types/questionnaires';
import generateID from '../../../../utils/generateID';
import UserCard from '../../Questionnaires/UserCards/UserCard';
import styles from './styles.module.scss';

type PropsT = {
    // cards: Array<GridSearchCardT>,
}

function NewQuestionnairesGrid({}:PropsT) {
    const dispatch = useAppDispatch();

    let cards = useAppSelector(questionnairesSelector).questionnaires.questionnaires.filter((item:GridSearchCardT) => item.responsibility === null);;

    return(
        <div className={styles.row}>
                    {cards.filter((card:GridSearchCardT) => !card.responsibility).map((card:GridSearchCardT, i: number) => {
                        return(
                            <div className={`${styles.item}`} key={generateID()}>
                                <UserCard card={card}/>
                            </div>
                        )
                    })}
            </div>
    )
}

export default NewQuestionnairesGrid;