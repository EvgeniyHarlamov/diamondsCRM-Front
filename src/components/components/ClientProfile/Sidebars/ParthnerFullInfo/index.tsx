import React from 'react';
import Sidebar from '../../../../UIKit/Sidebar';
import {ClientT, SectionT} from '../../../../../types';
import styles from './styles.module.scss';
import { currentQ } from '../../../../../types/questionnaires';
import InfoContainer from './InfoContainer';
import generateID from '../../../../../utils/generateID';

type PropsT = {
    isOpen: boolean
    data: currentQ,
    setState: (e:boolean) => void
}

function PartnerFullInfo({isOpen, setState,data}:PropsT) {
    const partner_appearance = data.partner_appearance;
    const partner_information = data.partner_information;
    let personal_qualities_partner = data.personal_qualities_partner;

    const handlePartnerPersonalQualitiies = (val: any) => {
        let keys = Object.keys(val);
        let values = Object.values(val);
        let data = [];
        for (let i = 0; i < keys.length; i++) {
            if (values[i] === true) {
                data.push(keys[i])
            }
        }
        return data;
    };

    // my_personal_qualities = handlePartnerPersonalQualitiies(my_personal_qualities);

    let test = data.test;

    const partner_appearance_arr = [
        {
            field: 'Пол',
            value: partner_appearance.sex
        },
        {
            field: 'Энтно-принадлежность',
            value: partner_appearance.ethnicity
        },
        {
            field: 'Телосложение',
            value: partner_appearance.body_type
        },
        {
            field: 'Попа',
            value: partner_appearance.booty
        },
        {
            field: 'Грудь',
            value: partner_appearance.chest
        },
        {
            field: 'Цвет волос',
            value: partner_appearance.hair_color
        },
        {
            field: 'Длина волос',
            value: partner_appearance.hair_length
        },
        {
            field: 'Цвет глаз',
            value: partner_appearance.eye_color
        }
    ]

    const partner_information_arr = [
        {
            field: 'ФИО',
            value: partner_information.name
        },
        {
            field: 'Возраст',
            value: partner_information.age
        },
        {
            field: 'Разница в возрасте',
            value: partner_information.age_difference
        },
        {
            field: 'Город',
            value: partner_information.city
        },
        {
            field: 'Отношение к алкоголю',
            value: partner_information.alcohol
        },
        {
            field: 'Аллергии',
            value: partner_information.allergies
        },
        {
            field: 'Лучший подарок для ваc',
            value: partner_information.best_gift
        },
        {
            field: 'Лучший подарок, который вы получали',
            value: partner_information.best_gift_received
        },
        {
            field: 'День рождения',
            value: partner_information.birthday
        },
        {
            field: 'Есть ли дети',
            value: partner_information.children
        },
        {
            field: 'Кол-во детей',
            value: partner_information.children_count
        },
        {
            field: 'Хотят ли детей',
            value: partner_information.children_desire
        },
        {
            field: 'Любите клубы?',
            value: partner_information.clubs
        },
        {
            field: 'В какие страны бы хотели',
            value: partner_information.countries_dream
        },
        {
            field: 'В каких странах были',
            value: partner_information.countries_was
        },
        {
            field: 'Занятия через 10 лет',
            value: partner_information.doing_10
        },
        {
            field: 'Образование',
            value: partner_information.education
        },
        {
            field: 'Черты характера, которые отталкивают',
            value: partner_information.features_repel
        },
        {
            field: 'Любимые фильмы/сериалы',
            value: partner_information.films
        },
        {
            field: 'Фильмы или книги?',
            value: partner_information.films_or_books
        },
        {
            field: 'Какие животные есть или нравятся',
            value: partner_information.have_pets
        },
        {
            field: 'Проблемы со здоровьем',
            value: partner_information.health_problems
        },
        {
            field: 'Мой Рост',
            value: partner_information.height
        },
        {
            field: 'Ваши хобби',
            value: partner_information.hobbies
        },
        {
            field: 'Идеальные выходные',
            value: partner_information.ideal_weekend
        },
        {
            field: 'Ваше кредо',
            value: partner_information.kredo
        },
        {
            field: 'Языки',
            value: partner_information.languages
        },
        {
            field: 'Семейное положение(Статус)',
            value: partner_information.marital_status
        },
        {
            field: 'Согласен ли переезжать в другой город',
            value: partner_information.moving_city
        },
        {
            field: 'Согласен ли переезжать в другую страну',
            value: partner_information.moving_country
        },
        {
            field: 'Отношение к животным',
            value: partner_information.pets
        },
        {
            field: 'Место рождения',
            value: partner_information.place_birth
        },
        {
            field: 'Как отдыхаете',
            value: partner_information.relax
        },
        {
            field: 'Религия и ее позиция',
            value: partner_information.religion
        },
        {
            field: 'Религия и ее позиция',
            value: partner_information.religion
        },
        {
            field: 'Зарплата',
            value: partner_information.salary
        },
        {
            field: 'Ваше любимое блюдо',
            value: partner_information.signature_dish
        },
        {
            field: 'Сова или жаворонок',
            value: partner_information.signature_dish
        },
        {
            field: 'Отношение к курение',
            value: partner_information.smoking
        },
        {
            field: 'Любимые песни',
            value: partner_information.songs
        },
        {
            field: 'Отношение к спорту',
            value: partner_information.sport
        },
        {
            field: 'Ваши таланты',
            value: partner_information.talents
        },
        {
            field: 'Вес',
            value: partner_information.weight
        },
        {
            field: 'Отношение к работе',
            value: partner_information.work
        },
        {
            field: 'Место работы',
            value: partner_information.work_name
        },
        {
            field: 'Место образования',
            value: partner_information.education_name
        },
        {
            field: 'Знак зодиака',
            value: partner_information.zodiac_signs
        },
    ]
    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'О партнере'}
            bodyClass={styles.body}
            useScrollbar={true}
        >
            <div className={'formList'}>
                <div>
                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Внешний вид</div>
                    </div>
                    {partner_appearance_arr.map((item:any) => (
                        <InfoContainer key = {generateID()} field={item.field} value={item.value}/>
                    ))}

                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Информация о клиенте</div>
                    </div>
                    {partner_information_arr.map((item:any) => (
                        <InfoContainer key = {generateID()} field={item.field} value={item.value}/>
                    ))}

                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Личные качества</div>
                    </div>
                    <InfoContainer value={personal_qualities_partner}/>

                </div>
            </div>
        </Sidebar>
    );
}

export default PartnerFullInfo;