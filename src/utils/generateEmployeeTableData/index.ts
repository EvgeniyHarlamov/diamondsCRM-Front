function generateEmployeeTableData(count: number) {
    let data: Array<any> = [];
    let roles: Array<string> = ['Администратор', 'Менеджер']
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
    for (let i = 0; i < count; i++) {
        let role = roles[Math.floor(Math.random() * roles.length)];
        let date = dates[Math.floor(Math.random() * dates.length)];
        let name = names[Math.floor(Math.random() * names.length)];
        let phone = phones[Math.floor(Math.random() * phones.length)];
        let email = emails[Math.floor(Math.random() * emails.length)];
        data.push({
            order: i + 1,
            name: name,
            email: email,
            phone: '+7 ' + phone,
            role: role,
            roleRaw: role,
            date: date,
            creator: 'Анастасия Николаева'
        })
    }
    return data;
}

export default generateEmployeeTableData;