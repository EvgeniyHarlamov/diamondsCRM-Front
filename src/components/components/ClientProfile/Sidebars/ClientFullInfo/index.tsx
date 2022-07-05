import React from 'react';
import Sidebar from '../../../../UIKit/Sidebar';
import {ClientT, SectionT} from '../../../../../types';
import styles from './styles.module.scss';
import { currentQ } from '../../../../../types/questionnaires';
import InfoContainer from './InfoContainer';
import dataTest from '../../../../../test2';
import generateID from '../../../../../utils/generateID';
import testData from '../../../../../test2';
import {ru} from '../../../../../constants';

type PropsT = {
    isOpen: boolean
    data: currentQ,
    setState: (e:boolean) => void
}

function ClientFullInfo({isOpen, setState,data}:PropsT) {
    const my_appearance = data.my_appearance;
    const my_information = data.my_information;
    let my_personal_qualities = data.my_personal_qualities;

    const handleMyPersonalQualitiies = (val: any) => {
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

    my_personal_qualities = handleMyPersonalQualitiies(my_personal_qualities);

    let test = data.test;


    const my_appearance_arr = [
        {
            field: 'Пол',
            value: my_appearance.sex
        },
        {
            field: 'Энтно-принадлежность',
            value: my_appearance.ethnicity
        },
        {
            field: 'Телосложение',
            value: my_appearance.body_type
        },
        {
            field: 'Попа',
            value: my_appearance.booty
        },
        {
            field: 'Грудь',
            value: my_appearance.chest
        },
        {
            field: 'Цвет волос',
            value: my_appearance.hair_color
        },
        {
            field: 'Длина волос',
            value: my_appearance.hair_length
        },
        {
            field: 'Цвет глаз',
            value: my_appearance.eye_color
        }
    ]

    const my_information_arr = [
        {
            field: 'ФИО',
            value: my_information.name
        },
        {
            field: 'Возраст',
            value: my_information.age
        },
        {
            field: 'Разница в возрасте',
            value: my_information.age_difference
        },
        {
            field: 'Город',
            value: my_information.city
        },
        {
            field: 'Отношение к алкоголю',
            value: my_information.alcohol
        },
        {
            field: 'Аллергии',
            value: my_information.allergies
        },
        {
            field: 'Лучший подарок для ваc',
            value: my_information.best_gift
        },
        {
            field: 'Лучший подарок, который вы получали',
            value: my_information.best_gift_received
        },
        {
            field: 'День рождения',
            value: my_information.birthday
        },
        {
            field: 'Есть ли дети',
            value: my_information.children
        },
        {
            field: 'Кол-во детей',
            value: my_information.children_count
        },
        {
            field: 'Хотят ли детей',
            value: my_information.children_desire
        },
        {
            field: 'Любите клубы?',
            value: my_information.clubs
        },
        {
            field: 'В какие страны бы хотели',
            value: my_information.countries_dream
        },
        {
            field: 'В каких странах были',
            value: my_information.countries_was
        },
        {
            field: 'Занятия через 10 лет',
            value: my_information.doing_10
        },
        {
            field: 'Образование',
            value: my_information.education
        },
        {
            field: 'Черты характера, которые отталкивают',
            value: my_information.features_repel
        },
        {
            field: 'Любимые фильмы/сериалы',
            value: my_information.films
        },
        {
            field: 'Фильмы или книги?',
            value: my_information.films_or_books
        },
        {
            field: 'Какие животные есть или нравятся',
            value: my_information.have_pets
        },
        {
            field: 'Проблемы со здоровьем',
            value: my_information.health_problems
        },
        {
            field: 'Мой Рост',
            value: my_information.height
        },
        {
            field: 'Ваши хобби',
            value: my_information.hobbies
        },
        {
            field: 'Идеальные выходные',
            value: my_information.ideal_weekend
        },
        {
            field: 'Ваше кредо',
            value: my_information.kredo
        },
        {
            field: 'Языки',
            value: my_information.languages
        },
        {
            field: 'Семейное положение(Статус)',
            value: my_information.marital_status
        },
        {
            field: 'Согласен ли переезжать в другой город',
            value: my_information.moving_city
        },
        {
            field: 'Согласен ли переезжать в другую страну',
            value: my_information.moving_country
        },
        {
            field: 'Отношение к животным',
            value: my_information.pets
        },
        {
            field: 'Место рождения',
            value: my_information.place_birth
        },
        {
            field: 'Как отдыхаете',
            value: my_information.relax
        },
        {
            field: 'Религия и ее позиция',
            value: my_information.religion
        },
        {
            field: 'Религия и ее позиция',
            value: my_information.religion
        },
        {
            field: 'Зарплата',
            value: my_information.salary
        },
        {
            field: 'Ваше любимое блюдо',
            value: my_information.signature_dish
        },
        {
            field: 'Сова или жаворонок',
            value: my_information.signature_dish
        },
        {
            field: 'Отношение к курение',
            value: my_information.smoking
        },
        {
            field: 'Любимые песни',
            value: my_information.songs
        },
        {
            field: 'Отношение к спорту',
            value: my_information.sport
        },
        {
            field: 'Ваши таланты',
            value: my_information.talents
        },
        {
            field: 'Вес',
            value: my_information.weight
        },
        {
            field: 'Отношение к работе',
            value: my_information.work
        },
        {
            field: 'Место работы',
            value: my_information.work_name
        },
        {
            field: 'Место образования',
            value: my_information.education_name
        },
         {
            field: 'Знак зодиака',
            value: my_information.zodiac_signs
        },
    ]

    let arr = testData;


    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'О клиенте'}
            bodyClass={styles.body}
            useScrollbar={true}
        >
            <div className={'formList'}>
                <div>
                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Внешний вид</div>
                    </div>
                    {my_appearance_arr.map((item:any) => (
                        <InfoContainer key = {generateID()} field={item.field} value={item.value}/>
                    ))}

                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Информация о клиенте</div>
                    </div>
                    {my_information_arr.map((item:any) => (
                        <InfoContainer key = {generateID()} field={item.field} value={item.value}/>
                    ))}

                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Мои личные качества</div>
                    </div>
                    <InfoContainer value={my_personal_qualities}/>

                    <div className={styles.sectionWrapper}>
                        <div className={styles.section}>Тестирование</div>
                    </div>

                    {arr.map((item:any, i:number) => {
                        let answerString: string = testData[i].field;
                        let answerIndex: number = data.test[answerString];
                        //@ts-ignore
                        let question = ru[testData[i].question];
                        //@ts-ignore
                        let answer: any = ru[testData[i].answers[answerIndex]];
                        return <InfoContainer key = {generateID()} field={question} value={answer}/>
                    })}


                </div>
            </div>
        </Sidebar>
    );
}

export default ClientFullInfo;