import declOfNum from "../declensionNumbers";
import generateID from "../generateID";
import getRandomInt from "../getRandomInt";
import randomizeValuesInArray from "../randomizeValuesInArray";

function generateKanbanCards(counter: number, firstContact:boolean) {
    let cards = [];
    const names = ['Антон Петров', 'Николай Соболев'];
    const inCharges = ['Николай Иванов', 'Екатерина Остомина', 'Валерьян Пугачев'];
    const services = ['Бесплатное участие в базе', 'Платные услуги', 'VIP услуги'];
    const isFirstContact = [true, false];

    for (let i = 0; i < counter; i++) {
        let time = getRandomInt(1,24);
        cards.push(
            {
                id: generateID(),
                name: randomizeValuesInArray(names),
                inCharge: randomizeValuesInArray(inCharges),
                service: randomizeValuesInArray(services),
                time: `${time} ${declOfNum(time, ['час', 'часа', 'часов'])} назад`,
                isFirstContact: firstContact
            }
        );
    }

    return cards;
}

export default generateKanbanCards;