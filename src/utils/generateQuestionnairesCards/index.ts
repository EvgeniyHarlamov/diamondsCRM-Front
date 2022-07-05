import { QuestionnairesCard } from "../../types";
import declOfNum from "../declensionNumbers";
import getRandomInt from "../getRandomInt";
import randomizeValuesInArray from "../randomizeValuesInArray";

function generateQuestionnairesCards(counter: number) {
    let cards:Array<QuestionnairesCard> = [];
    const nations = ['Русский','Англичанин','Поляк'];
    const countries = ['Россия', 'Британия', 'США']
    const ages = ['20','40',19];
    const cities = ['Москва','Рига','Лондон'];
    const inCharges = ['Николай Николаев','Петр Петров', 'Иван Иванов'];
    // const times = ['2', '5', '24'];
    const services = ['Оплачено', 'На оплате', 'Бесплатно'];
    const names = ['Констанин Константинопольский', 'Сергей Конаев', 'Антон Петров'];
    let avatarTemplate = '/photoExamples/';
    const avatars = [avatarTemplate + 'user1.png', avatarTemplate + 'user2.png', avatarTemplate + 'user3.png'];
    for (let i = 0; i < counter; i++) {
        let time = getRandomInt(1,24);
        cards.push(
            {
                nation: randomizeValuesInArray(nations),
                age: randomizeValuesInArray(ages),
                city: randomizeValuesInArray(cities),
                inCharge: randomizeValuesInArray(inCharges),
                time: `${time} ${declOfNum(time, ['час', 'часа', 'часов'])} назад`,
                service: randomizeValuesInArray(services),
                name: randomizeValuesInArray(names),
                avatar: randomizeValuesInArray(avatars),
                country: randomizeValuesInArray(countries)
            }
        );
    }

    return cards;
}

export default generateQuestionnairesCards;