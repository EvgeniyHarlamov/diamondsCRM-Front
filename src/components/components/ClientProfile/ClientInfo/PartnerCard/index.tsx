import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks';
import { questionnairesSelector } from '../../../../../features/questionnairesSlice';
import { InfoCardRowT, SectionT } from '../../../../../types';
import { currentQ } from '../../../../../types/questionnaires';
import Button from '../../../../UIKit/Button';
import ParthnerFullInfo from '../../Sidebars/ParthnerFullInfo';
import styles from './styles.module.scss';


type PropsT = {}

function PartnerCard() {
    const userID = useParams();
    // const profileInfo = profile.filter((section) => section.section.includes('Внешний вид'))[0].info;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const info:currentQ = useAppSelector(questionnairesSelector).current;

    return(
        <div className={styles.cardWrapper}>
            <div className={styles.MainInfoWrapper}>
                <span className={styles.name}>
                    Анкета партнера
                </span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Национальность</span>
                <span className={styles.fieldValue}>{info.partner_appearance.ethnicity}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Возраст</span>
                <span className={styles.fieldValue}>{info.partner_information.age}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Знак зодиаке</span>
                <span className={styles.fieldValue}>{info.partner_information.zodiac_signs}</span>
            </div>
            <div className={styles.infoFieldContainer}>
                <span className={styles.field}>Рост и вес</span>
                <span className={styles.fieldValue}>{`${info.partner_information.height} см / ${info.my_information.weight} кг`}</span>
            </div>
             <Button className={styles.detailsButton} onClick={() => setSidebarOpen(true)}>
                <span>Показать подробнее</span>
            </Button>
            <ParthnerFullInfo
                isOpen={sidebarOpen}
                setState={setSidebarOpen}
                data={info}
            />
        </div>);
}

export default PartnerCard;