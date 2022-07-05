import { defaultDropdownState, employeesDropdown } from "../../../../constants";
import Button from "../../../UIKit/Button";
import Input from "../../../UIKit/Input";
import Sidebar from "../../../UIKit/Sidebar";
import UncontrolledDropdown from "../../../UIKit/UncontrolledDropdown";
import Select from "../../../UIKit/Select";

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
    resetSearch: () => void
    globalIndicator: number
    searchInputValue: string
    setSearchInputValue: (event:any) => void
    setRoleFilter: (event:any) => void
    roleFilter: string
}

function EmployeesMobileSearch({isOpen, setState, resetSearch, globalIndicator, searchInputValue,
    setSearchInputValue, setRoleFilter, roleFilter}:PropsT) {
    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'Поиск по сотрудникам'}
            >
                <div className={'formList'}>
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
                        <Select
                            placeholder={'Выберите роль'}
                            onChange={(event:any) => setRoleFilter(event.value)}
                            label={'Роль'}
                            className={'item'}
                            options={employeesDropdown}
                        />
                        {/* <UncontrolledDropdown
                            placeholder={'Выберите роль'}
                            wrapperClasses = {'item'}
                            value={roleFilter}
                            valueStyle={{color: '#2E3E3F'}}
                            icon={'/icons/arrow.svg'}
                            label={'Роль'}
                            options={[defaultDropdownState, 'Администратор', 'Менеджер']}>
                        </UncontrolledDropdown> */}
                        <div className={'sidebar-footer'}>
                                <div className={'btns-container'}>
                                    <Button
                                        color={'green'}
                                        className={'sidebar-button'}
                                        onClick={() => setState(false)}
                                    >
                                        Показать {globalIndicator} сотрудников
                                    </Button >
                                    <Button onClick={() =>
                                    {
                                        resetSearch();
                                    }} color={'default'} margin={'0 1rem 0 0'} >
                                        Сбросить фильтры
                                    </Button>
                                </div>
                        </div>
                </div>
        </Sidebar>
    )
};

export default EmployeesMobileSearch;