

function CreateApplicationsCounterName(counter: number) {

    return counter > 0 ? (counter < 2 ? counter + ' заявка' : counter + ' заявки') :
    'Нет заявок'
}

export default CreateApplicationsCounterName;