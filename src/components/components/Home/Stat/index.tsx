import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { questionnairesSelector } from '../../../../features/questionnairesSlice';
import generateID from '../../../../utils/generateID';
import StatCard from './StatCard';
import styles from './styles.module.scss';

function Stat() {
    const stats = useAppSelector(questionnairesSelector).stats;

    const cards = [
        {
            iconSrc: '/icons/statHeartOrange.svg',
            counter: {
                counter: stats.questionnaires_all_count,
                color: '#EC9A29',
            },
            title: 'Всего анкет'
        },
        {
            iconSrc: '/icons/statUserBlue.svg',
            counter: {
                counter: stats.applications_all_count,
                color: '#528DD2',
            },
            title: 'Всего контактов'
        },
        {
            iconSrc: '/icons/statHeartRed.svg',
            counter: {
                counter: stats.questionnaires_new_count,
                color: '#E15252',
            },
            title: 'Новых анкет'
        },
        {
            iconSrc: '/icons/statUserGreen.svg',
            counter: {
                counter: stats.questionnaires_new_count,
                color: '#5BAE4E',
            },
            title: 'Новых контактов'
        },
    ]
   return(
       <div className={styles.wrapper}>
            <div className={styles.row}>
                {cards.map((card) =>
                    <div className={styles.item} key={generateID()}>
                        <StatCard
                                iconSrc={card.iconSrc}
                                counter={card.counter}
                                title={card.title}
                        />
                    </div>
                )}
            </div>
            <div className={styles.grid}>
                {cards.map((card) =>
                    <div key={generateID()}>
                        <StatCard
                                iconSrc={card.iconSrc}
                                counter={card.counter}
                                title={card.title}
                        />
                    </div>
                )}
            </div>
       </div>
   )
}

export default Stat;