import { clientDropdownMenuOptions } from "../../constants";
import generateID from "../generateID";
import randomizeValuesInArray from "../randomizeValuesInArray";

function generateTableData(count: number, type:string = 'archive') {
    let data: Array<any> = [];
    let services = ['Бесплатные услуги', 'Платные услуги', 'VIP Услуги'];
    let inCharges: Array<string> = ['Анита Николаева', 'Николай Иванов'];
    let statuses: Array<string> = ['Контакт', 'В работе', 'Платеж', 'Оплачено'];
    let dates: Array<{date: string, time: string}> =
    [{
        date: '01.01.2000',
        time: '2.49'
    },
    {
        date: '01.02.2001',
        time: '15.23'
    },
    {
        date: '01.03.2003',
        time: '23.39'
    },
        ]
    let names: Array<string> = ['Иван Иванов', 'Игорь Игорев', 'Павел Павлов', 'Евгений Евгенов', 'Григорий Буденов']
    let phones: Array<string> = ['(993) 360-9046', '(309) 772-3708', '(483) 609-2203', '(276) 804-0038', '(202) 792-9541']
    let emails: Array<string> = ['petrov@example.com', 'alisa@example.com', 'dasha@example.com']
    let sources: Array<string> = ['RU : cайт : форма #1', 'RU : cайт : форма #2', 'EN : Email']
    const isFirstContactValues = [true, false];
    for (let i = 0; i < count; i++) {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        let inCharge = inCharges[Math.floor(Math.random() * inCharges.length)];
        let date = dates[Math.floor(Math.random() * dates.length)];
        let name = names[Math.floor(Math.random() * names.length)];
        let phone = phones[Math.floor(Math.random() * phones.length)];
        let email = emails[Math.floor(Math.random() * emails.length)];
        let service = services[Math.floor(Math.random() * emails.length)];
        let source = randomizeValuesInArray(sources);
        let isFirstContact = randomizeValuesInArray(isFirstContactValues)
        data.push({
            id: generateID(),
            service: service,
            order: i + 1,
            name: name,
            email: email,
            phone: '+7 ' + phone,
            inCharge: inCharge,
            status: status,
            date: date,
            creator: 'Анастасия Николаева',
            source: source,
            type: type,
        })
    }
    return data;
}

export default generateTableData;