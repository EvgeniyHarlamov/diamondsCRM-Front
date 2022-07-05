export type CityT = {
    value_ru: string,
    value_en: string
}

export type UtilsCitiesResponseT = {
    success: true,
    message: string,
    data: Array<CityT> | []
}

export type GetCitiesT = {
    title: string
}

export type CountryT = {
    value_ru: string,
    value_en: string
}

export type UtilsCountriesResponseT = {
    success: true,
    message: string,
    data: Array<CityT> | []
}

export type GetCountriesT = {}