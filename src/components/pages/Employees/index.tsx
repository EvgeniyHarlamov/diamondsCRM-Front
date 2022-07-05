import React, {useEffect, useMemo, useState} from 'react';
import Container from '../../UIKit/Container';
import Input from '../../UIKit/Input';
import Navbar from '../../UIKit/Navbar';
import Separator from '../../UIKit/Separator';
import EmployeesTable from '../../components/Employees/EmployeesTable';
import styles from "./styles.module.scss";
import EmployeesMobileSearch from '../../components/Employees/EmployeesMobileSearch';
import UncontrolledDropdown from '../../UIKit/UncontrolledDropdown';
import AddEmployee from '../../components/Employees/AddEmployee';
import { defaultDropdownState } from '../../../constants';
import generateEmployeeTableData from '../../../utils/generateEmployeeTableData';
import Scrollbar from '../../UIKit/Scrollbar';
import { employeesSelector, getEmployees } from '../../../features/employeesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginUser } from '../../../features/authSlice';
import { EmployeeT } from '../../../types/employees';
import Loader from 'react-loader-spinner';

function Employees () {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEmployees({}));
    }, [])

    const employees = useAppSelector(employeesSelector).employees.data;
    const count = useAppSelector(employeesSelector).employees.count;
    const isLoaded = useAppSelector(employeesSelector).isLoaded;

    const [employeeRoleFilterValue, setEmployeeRoleFilterValue] = useState('Не выбрано');

    const [paginationLimitValue, setPaginationLimitValue] = useState('20');

    const [sortingTypeValue, setSortingTypeValue] = useState('Сначала старые');

    const [searchInputValue, setSearchInputValue] = useState('');

    const [sidebarState, setSidebarState] = useState(false);
    const [findEmployeeSidebarState, setFindEmployeeSidebarState] = useState(false);

    const [indicator, setIndicator] = useState(0);
    const [globalIndicator, setGlobalIndicator] = useState(0);
    const columnTemplateFull = [
        {
            Header: '#',
            accessor: 'order',
            id: 'order',
        },
        {
            Header: 'ИМЯ',
            accessor: 'name',
            id: 'name',
        },
        {
            Header: 'EMAIL',
            accessor: 'email',
            id: 'email',
        },
        {
            Header: 'НОМЕР ТЕЛЕФОНА',
            accessor: 'phone',
            id: 'phone',
        },
        {
            Header: 'РОЛЬ',
            accessor: 'role',
            id: 'role',
            disableSortBy: true
        },
        {
            accessor: 'roleRaw',
            id: 'roleRaw',
        },
        {
            accessor: 'created_at',
            id: 'created_at',
        },
        {
            accessor: 'created_at_timestamp',
            id: 'created_at_timestamp',
        },
    ]

    const columns = useMemo(
        () => columnTemplateFull,
        []
    );

    const data = React.useMemo(() =>
            employees.map((employee:EmployeeT) => {
                return {
                    order: employee.id,
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    role: employee.role === 1 ?
                    <div className={styles.statusWrapper}>
                        <div className={styles.adminStatus}>
                           Админ
                        </div>
                    </div>
                        :
                    <div className={styles.statusWrapper}>
                        <div className={styles.managerStatus}>Менеджер</div>
                    </div>,
                    roleRaw: employee.role,
                    created_at: employee.created_at,
                    created_at_timestamp: employee.created_at_timestamp
                }
            })
        , [employees])

        const [currentEmpRowsCounter, setCurrentEmpRowsCounter] = useState(employees.length);
        useEffect(() => {
            setCurrentEmpRowsCounter(count);
        }, [employees])

    return (
        <Scrollbar>
            <div className={'page'}>
                <div className={styles.filtersHeaderWrapper}>
                    <Container>
                        <div className={styles.filtersHeaderContainer}>
                            <div className={styles.filterHeaderContainer}>
                                <span className={styles.filterHeader}>Сотрудники</span>
                            </div>
                            <button className={styles.employeeBtn}
                            onClick={() => {setSidebarState(true)}}>
                                Новый сотрудник
                            </button>
                            <div className={styles.mobileButtonsContainer}>
                                <span
                                    className={styles.findButton}
                                    onClick={() => {setFindEmployeeSidebarState(true)}}
                                    >
                                    <img src="/buttons/find.svg"/>
                                </span>
                                <span onClick={() => setSidebarState(true)}>
                                    <img src="/buttons/plus.svg"/>
                                </span>
                        </div>
                        </div>
                        <div className={styles.searchBar}>
                            <Input
                                type={'text'}
                                name={'employeesSearchbar'}
                                id={'employeesSearchbar'}
                                placeholder={'Поиск по ключевым словам'}
                                onChange={(e) => setSearchInputValue(e.target.value)}
                                value={searchInputValue}
                                icon={'/icons/find.svg'}
                            />
                            <UncontrolledDropdown
                                    placeholder={'Роль'}
                                    onChange={(value) => setEmployeeRoleFilterValue(value)}
                                    valueStyle={{color: '#2E3E3F'}}
                                    icon={'/icons/arrow.svg'}
                                    options={[defaultDropdownState, 'Администратор', 'Менеджер']}
                                    >
                            </UncontrolledDropdown>
                        </div>

                    </Container>
                </div>
                <Separator style={{backgroundColor: '#dee2e6'}}/>
                <div className={styles.tableContentWrapper}>
                    <Container mobileFull={true}>
                        <div className={styles.tableHeader}>
                            <div className={styles.pagginationPanel}>
                                <UncontrolledDropdown placeholder={'Показывать по'}
                                        classes={styles.snowMore}
                                        defaultValue={'20'}
                                        placeholderStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        valueStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        toggleWrapperStyle={{paddingLeft: 0, paddingRight: 0}}
                                        delimiter
                                        onChange={(value) => setPaginationLimitValue(value)}
                                        iconStyle={{paddingLeft: '.5rem'}}
                                        isPlaceholderFixed={true}
                                        icon={'/icons/arrow.svg'}
                                        options={['20','40','60','80']}
                                        >
                                </UncontrolledDropdown>
                                <div className={styles.item}>
                                    <span>{Number(paginationLimitValue) * indicator + 1}-{Number(paginationLimitValue) * (indicator + 1)} из {globalIndicator}</span>
                                </div>
                            </div>
                            <div className={styles.sortFiltersContainer}>
                                <UncontrolledDropdown placeholder={'Сортировка'}
                                        placeholderClasses={styles.hideSortPlaceholder}
                                        defaultValue={'Сначала новые'}
                                        delimiter
                                        onChange={(value) => setSortingTypeValue(value)}
                                        placeholderStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        valueStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        toggleWrapperStyle={{paddingRight: '0'}}
                                        isPlaceholderFixed={true}
                                        iconStyle={{paddingLeft: '.5rem'}}
                                        icon={'/icons/arrow.svg'}
                                        options={['Сначала новые','Сначала старые']}
                                >
                                </UncontrolledDropdown>
                            </div>
                        </div>
                        {isLoaded ?
                            <EmployeesTable
                                columns={columns}
                                data={data}
                                paginationLimit={paginationLimitValue}
                                sortingType={sortingTypeValue}
                                employeeRoleFilter={employeeRoleFilterValue}
                                searchInput={searchInputValue}
                                setIndicator={setIndicator}
                                setGlobalIndicator={setGlobalIndicator}
                                setCurrentEmpRowsCounter={setCurrentEmpRowsCounter}
                            />
                        :
													<div className={'loaderWrapper'}>
														<Loader
															type="Hearts"
															color="rgb(236, 154, 41)"
															height={100}
															width={100}
														/>
													</div>
                        }
                        <AddEmployee isOpen={sidebarState} setState={setSidebarState}/>
                        <EmployeesMobileSearch
                            isOpen={findEmployeeSidebarState}
                            setState={setFindEmployeeSidebarState}
                            globalIndicator={currentEmpRowsCounter}
                            searchInputValue={searchInputValue}
                            resetSearch={() => { setEmployeeRoleFilterValue(defaultDropdownState)}}
                            setSearchInputValue={(e) => setSearchInputValue(e.target.value)}
                            setRoleFilter={setEmployeeRoleFilterValue}
                            roleFilter={employeeRoleFilterValue}
                        />
                    </Container>
                </div>
            </div>
        </Scrollbar>
    )
}

export default Employees;