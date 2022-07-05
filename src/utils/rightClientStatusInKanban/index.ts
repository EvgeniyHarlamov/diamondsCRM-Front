function rightClientStatusInKanban(value: number | string) {
    if (value === 0 || value === 'Бесплатно') return 'Бесплатно';
    if (value === 1 || value === 'В работе') return 'В работе';
    if (value === 2 || value === 'Платеж') return 'Платеж';
    if (value === 3 || value === 'Оплачено') return 'Оплачено';
}

export default rightClientStatusInKanban;