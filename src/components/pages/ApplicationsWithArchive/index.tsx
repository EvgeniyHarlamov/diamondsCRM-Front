import styles from './styles.module.scss';
import Navbar from '../../UIKit/Navbar';
import Separator from '../../UIKit/Separator';
import React, { useEffect, useState } from 'react';
import UncontrolledDropdown from '../../UIKit/UncontrolledDropdown';
import Input from '../../UIKit/Input';
import Container from '../../UIKit/Container';
import { clientDropdownMenuOptions, clientMenuOptions, defaultDropdownState, domain } from '../../../constants';
import AddApplication from '../../components/ApplicationsWithArchive/AddApplication';
import ApplicationsMobileSearch from '../../components/ApplicationsWithArchive/ApplicationsMobileSearch';
import Archive from '../../components/ApplicationsWithArchive/Archive';
import Applications from '../../components/ApplicationsWithArchive/Applications';
import Scrollbar from '../../UIKit/Scrollbar';
import Select from '../../UIKit/Select';
import AsyncSelect from '../../UIKit/AsyncSelect';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { archiveEmployee, employeesSelector, getEmployees } from '../../../features/employeesSlice';
import formatEmployeesToInChargeList from '../../../utils/format/formatEmployeesToInChargeList';
import { EmployeeT } from '../../../types/employees';
import { applicationsSelector, getApplications, clearApplications } from '../../../features/applicationsSlice';
import { DropdownItem } from '../../../types';
import Loader from 'react-loader-spinner';
import fetch from "node-fetch";
import fetchWithQueryParams from "../../../utils/fetchWithQueryParams";
import {GetApplicationsT} from "../../../types/applications";


type PropsT = {}

const ApplicationsWithArchive = ({}:PropsT) => {
    const [serviceFilterValue, setServiceFilterValue] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');

    const dispatch = useAppDispatch();

    let employees = formatEmployeesToInChargeList(useAppSelector(employeesSelector).employees.data);
    const [employeesState, setEmployeesState] = useState<Array<DropdownItem> | []>([]);
		//
    // @ts-ignore
	useEffect(() => {
        let employeesWithAll = employees;
        employeesWithAll.unshift({label: 'Не выбрано', value: ''});
        setEmployeesState(employeesWithAll);
    }, [useAppSelector(employeesSelector)]);

    const temp = useAppSelector(applicationsSelector);

    const archives = temp.applications_archive;
    const applications = temp.applications;
    const fetched = temp.isLoaded;

    const [sidebarState, setSidebarState] = useState(false);
    const [findClientSidebarState, setFindClientSidebarState] = useState(false);
		//
    const [component, setComponent] = useState('applications');
		//
    const [globalIndicator, setGlobalIndicator] = useState(0);

    // @ts-ignore
		useEffect(() => {
        if (component === 'archive') {
					dispatch(getApplications({archive_only:true}));
				} else {
					dispatch(getEmployees({}));

					dispatch(getApplications({}));
				}

				return dispatch(clearApplications());
    }, [component]);

	return (
        <Scrollbar>
            <div className={'page'}>
                <div className={styles.filtersHeaderWrapper}>
                    <Container>
                        <div className={styles.filtersHeaderContainer}>
                            <div className={styles.filterHeaderContainer}>
                                <span
                                    className={component === 'applications' ?
                                    styles.filterHeaderActive : styles.filterHeader}
                                    onClick={() => setComponent('applications')}>
                                        Заявки
                                </span>
                                <span className={component === 'archive' ?
                                    styles.filterHeaderActive : styles.filterHeader}
                                    onClick={() => setComponent('archive')}>
                                        Архив
                                </span>
                            </div>
                            <button className={styles.createApplicationBtn}
                            onClick={() => {setSidebarState(true)}}>
                                Создать заявку
                            </button>
                            <div className={styles.mobileButtonsContainer}>
                                <span
                                    className={styles.findButton}
                                    onClick={() => {setFindClientSidebarState(true)}}
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
                                onChange={(e) =>{
                                    setSearchInputValue(e.target.value)}
                                }
                                value={searchInputValue}
                                icon={'/icons/find.svg'}
                            />
                            <Select
                                placeholder={'Выберите сотрудника'}
                                searchable
                                options={employeesState}
                                className={'item'}
                                onChange={(event:any) => {
                                        setServiceFilterValue(event.value)
                                    }
                                }
                            />
                        </div>
                    </Container>
                </div>
                <Separator style={{backgroundColor: '#dee2e6'}}/>
                {fetched ?
                    <>
                        <Applications
                            display = {component === 'applications'}
                            searchInputValue={searchInputValue}
                            serviceFilterValue={serviceFilterValue}
                        />
											<Archive
												display = {component === 'archive'}
												serviceFilter={serviceFilterValue}
												searchInputValue={searchInputValue}
												setGlobalIndicator={setGlobalIndicator}
												globalIndicator={globalIndicator}
											/>
                    </>
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
                <AddApplication isOpen={sidebarState} setState={setSidebarState}/>

                <ApplicationsMobileSearch
                        options={employeesState}
                        isOpen={findClientSidebarState}
                        setState={setFindClientSidebarState}
                        globalIndicator={component === 'applications' ? applications.length : archives.length} //
                        searchInputValue={searchInputValue}
                        resetSearch={() => { setServiceFilterValue('Все')}}
                        setSearchInputValue={(e) => setSearchInputValue(e.target.value)}
                        setServiceFilter={setServiceFilterValue}
                        serviceFilter={serviceFilterValue}
                />
                </div>
        </Scrollbar>
    )
};

export default ApplicationsWithArchive;