import React, { useEffect } from 'react';
import Container from '../../../UIKit/Container';
import UserCard from './UserCard';
import styles from './styles.module.scss';
import { QuestionnairesCard } from '../../../../types';
import { GridSearchCardT } from '../../../../types/questionnaires';
import generateID from '../../../../utils/generateID';

type PropsT = {
    cards: Array<GridSearchCardT>,
    limit: number,
    begin: number
}

function UserCards({cards, limit}:PropsT) {

    return(
        <Container mobileFull>
            <div className={styles.row}>
                    {cards.map((card:GridSearchCardT, i: number) => {
                        if (i < limit) return(
                        <div className={`${styles.item}`} key={generateID()}
                        >
                            <UserCard card={card}/>
                        </div>
                        )
                    })}
            </div>
        </Container>
    )
}

export default UserCards;