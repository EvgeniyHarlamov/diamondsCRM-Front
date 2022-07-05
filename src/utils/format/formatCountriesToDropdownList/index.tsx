import { DropdownItem } from "../../../types";
import { CountryT } from "../../../types/utils";

function formatCountriesToDropdownList(countries:Array<CountryT>) {
    return countries.map((country) =>
    ({
        label: country.value_ru,
        value: country.value_ru
    }));
}

export default formatCountriesToDropdownList;