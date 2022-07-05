import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../../../../app/hooks';
import { questionnairesSelector, viewQuestionnaire } from '../../../../../features/questionnairesSlice';
import { InfoCardRowT, SectionT } from '../../../../../types';
import { currentQ } from '../../../../../types/questionnaires';
import Button from '../../../../UIKit/Button';
import ClientFullInfo from '../../Sidebars/ClientFullInfo';
import styles from './styles.module.scss';


type PropsT = {}

function ClientCard() {
    const userID = useParams();
    // const profileInfo = profile.filter((section) => section.section.includes('Внешний вид'))[0].info;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const info:currentQ = useAppSelector(questionnairesSelector).current;

    return(
        <div className={styles.cardWrapper}>
            <div className={styles.MainInfoWrapper}>
                <span className={styles.name}>
                    Анкета клиента
                </span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Национальность</span>
                <span className={styles.fieldValue}>{info.my_appearance.ethnicity}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Возраст</span>
                <span className={styles.fieldValue}>{info.my_information.age}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Знак зодиаке</span>
                <span className={styles.fieldValue}>{info.my_information.zodiac_signs}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Рост и вес</span>
                <span className={styles.fieldValue}>{`${info.my_information.height} см / ${info.my_information.weight} кг`}</span>
            </div>
             <Button className={styles.detailsButton} onClick={() => setSidebarOpen(true)}>
                <span>Показать подробнее</span>
            </Button>
            <ClientFullInfo
                isOpen={sidebarOpen}
                setState={setSidebarOpen}
                data={info}
            />
        </div>
    )
}

export default ClientCard;