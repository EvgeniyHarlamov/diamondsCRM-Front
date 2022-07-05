function convertClientStatusToString(value:number) {
    if (value === 0) return 'Контакт';
    if (value === 1) return 'В работе';
    if (value === 2) return 'Платеж';
    if (value === 3) return 'Оплачено';
}

export default convertClientStatusToString;