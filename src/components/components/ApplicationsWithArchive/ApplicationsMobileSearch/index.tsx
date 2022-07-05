import { clientMenuOptions, defaultDropdownState } from "../../../../constants";
import Button from "../../../UIKit/Button";
import Input from "../../../UIKit/Input";
import Sidebar from "../../../UIKit/Sidebar";
import UncontrolledDropdown from "../../../UIKit/UncontrolledDropdown";
import styles from './styles.module.scss';
import Select from '../../../UIKit/Select';
import declOfNum from "../../../../utils/declensionNumbers";
import numWord from "../../../../utils/correctInducement";
import { DropdownItem } from "../../../../types";

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
    resetSearch: () => void
    globalIndicator: number
    searchInputValue: string
    setSearchInputValue: (event:any) => void
    setServiceFilter: (event:any) => void
    serviceFilter: string
    options: Array<DropdownItem>
}



function ApplicationsMobileSearch({isOpen, setState, resetSearch, globalIndicator, searchInputValue,
    setSearchInputValue, setServiceFilter, serviceFilter,options}:PropsT) {
    const words:Array<string> = ['заявка', 'заявки', 'заявок'];
    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'Поиск по заявкам'}
            >
                <div className={`formList ${styles.formListCustom}`}>
                        <Input
                            label = {'Поиск'}
                            type={'text'}
                            wrapperClasses = {'item'}
                            name={'employeesSearchbar'}
                            id={'employeesSearchbar'}
                            placeholder={'Поиск по ключевым словам'}
                            onChange={setSearchInputValue}
                            value={searchInputValue}
                            icon={'/icons/find.svg'}
                        />
                        {/* <UncontrolledDropdown
                            placeholder={!serviceFilter ? 'Ответственный сотрудник' : ''}
                            wrapperClasses = {'item'}
                            onChange={(value) => setServiceFilter(value)}
                            value={serviceFilter}
                            valueStyle={{color: '#2E3E3F'}}
                            icon={'/icons/arrow.svg'}
                            label={'Ответственный'}
                            options={[defaultDropdownState, 'Бесплатный услуги', 'Платные услуги', 'VIP Услуги']}>
                        </UncontrolledDropdown> */}
                        <Select
                            placeholder={!serviceFilter ? 'Ответственный сотрудник' : ''}
                            className = {'item'}
                            defaultValue={'Не выбрано'}
                            onChange={(event) => setServiceFilter(event.value)}
                            label={'Ответственный'}
                            options={options}
                        />

                        <div className={'sidebar-footer'}>
                                <div className={'btns-container'}>
                                    <Button color={'green'} className={'sidebar-button'}>
                                        {`Показать ${globalIndicator} ${numWord(globalIndicator, words)}`}
                                    </Button >
                                    {/* <Button onClick={() =>
                                    {
                                        resetSearch();
                                    }} color={'default'} className={'sidebar-button'} >
                                        Сбросить фильтры
                                    </Button> */}
                                </div>
                        </div>
                </div>
        </Sidebar>
    )
};

export default ApplicationsMobileSearch;