import React from 'react';
import styles from './styles.module.scss';
import FieldAndValue from './FieldAndValue';
import Value from './Value';

type PropsT = {
    field?: string,
    value: string | boolean | null | Array<string>
};

function InfoContainer({field, value}: PropsT) {
    const handleBoolean = (value: any) => {
        if (typeof(value) === 'boolean') {
            if (value) return 'Да'
            else return 'Нет';
        }
        return value;
    };
    let result = handleBoolean(value);
    const FieldAndValueWrapper: React.ReactNode =
    <div className={styles.rowWrapper}>
        <FieldAndValue row={{field, value: result}}/>
    </div>

    const ValueWrapper: React.ReactNode =
    <div className={styles.rowOnlineWrapper}>
        {Array.isArray(value) ?
            value.map((item:string) => {
                return <Value row={{value: handleBoolean(item)}}/>
                }
            )
            :
            <Value row={{field, value: result}}/>
        }
    </div>
    return (
    <>
        {field? FieldAndValueWrapper : ValueWrapper}
    </>);
}

export default InfoContainer;

// my_appearance: {sex: "Женщина", ethnicity: "Не важно", body_type: "Атлетический", chest: null, booty: null,…}
// body_type: "Атлетический"
// booty: null
// chest: null
// ethnicity: "Не важно"
// eye_color: "Голубые"
// hair_color: "Блонд"
// hair_length: null
// sex: "Женщина"

// my_information: {age: "20 лет", place_birth: "Ейск", city: "Россия, Москва", zodiac_signs: "Овен", height: "191.2",…}
// age: "20 лет"
// age_difference: "4"
// alcohol: "Могу иногда выпить"
// allergies: "Нет"
// best_gift: "Я"
// best_gift_received: "Какой-то"
// birthday: "15.01.2000"
// children: false
// children_count: null
// children_desire: "yes"
// city: "Россия, Москва"
// clubs: "Не люблю"
// countries_dream: "Все"
// countries_was: "Россия"
// doing_10: "Что-то"
// education: "ЮФУ"
// features_repel: "Что-то отталкивает"
// films: "Какой-то фильм"
// films_or_books: "Фильмы"
// have_pets: "Да"
// health_problems: "Нет"
// height: "191.2"
// hobbies: "Бизнес"
// ideal_weekend: "Какой-то"
// kredo: "Какое-то"
// languages: ""
// marital_status: "one"
// moving_city: true
// moving_country: true
// name: "Ангелина"
// pets: "Люблю"
// place_birth: "Ейск"
// relax: "гулять"
// religion: "Православный"
// salary: "100 000"
// signature_dish: "Бутеры с сыром"
// sleep: "Сова"
// smoking: "Иногда курю"
// songs: "Резать океаны"
// sport: "Занимаюсь"
// talents: "Какие-то"
// weight: "76"
// work: "ЮФУ"
// zodiac_signs: "Овен"
// my_personal_qualities: {Спокойная: true, Энергичная: false, Веселая: true, Скромная: true, Целеустремленная: true,…}
// Амбициозная: false
// Аристократическая: false
// Артистичная: false
// Безвольная: true
// Бесстрашная: false
// Веселая: true
// Грациозная: false
// Деловая: false
// Добрая: false
// Женственная: true
// Зависящая: true
// Застенчивая: false
// Игривая: false
// Мужественная: false
// Нежная: true
// Общительная: false
// Прагматичная: true
// Самостоятельная: true
// Скромная: true
// Спокойная: true
// Спортивная: false
// Стильная: false
// Уверенная в себе: false
// Улыбчивая: true
// Умеющая жить здесь и сейчас: false
// Хозяйственная: false
// Целеустремленная: true
// Экономная: false
// Энергичная: false