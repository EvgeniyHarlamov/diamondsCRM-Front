import React, { useEffect, useRef, useState } from 'react';
import { clientMenuOptionsGrid, defaultDropdownState, domain, employeesDropdown } from '../../../constants';
import Container from '../../UIKit/Container';
import Input from '../../UIKit/Input';
import Navbar from '../../UIKit/Navbar';
import UncontrolledDropdown from '../../UIKit/UncontrolledDropdown';
import styles from './styles.module.scss';
import ButtonsMenu from '../../UIKit/ButtonsMenu';
import Separator from '../../UIKit/Separator';
import UserCard from '../../components/Questionnaires/UserCards/UserCard';
import UserCards from '../../components/Questionnaires/UserCards';
import generateQuestionnairesCards from '../../../utils/generateQuestionnairesCards';
import { DropdownItem, QuestionnairesCard } from '../../../types';
import FindUsers from '../../components/Questionnaires/FindUsers';
import Scrollbar from '../../UIKit/Scrollbar';
import Select from '../../UIKit/Select';
import {GridPaginationT, GridSearchCardT, GridSearchParams, questionnairesT} from '../../../types/questionnaires';
import { multiValueCSS } from 'react-select/src/components/MultiValue';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { employeesSelector, getEmployees } from '../../../features/employeesSlice';
import formatEmployeesToInChargeList from '../../../utils/format/formatEmployeesToInChargeList';
import AsyncSelect from '../../UIKit/AsyncSelect';
import { countriesSelector, getCountries } from '../../../features/utilsSlice';
import formatCountriesToDropdownList from '../../../utils/format/formatCountriesToDropdownList';
import fetchWithQueryParams from '../../../utils/fetchWithQueryParams';
import { getQuestionnaires, questionnairesSelector } from '../../../features/questionnairesSlice';
import Loader from "react-loader-spinner";
import debounce from 'debounce';
import NotFound from '../../UIKit/NotFound';

function Questionnaires() {
    const dispatch = useAppDispatch();
    const cards:Array<GridSearchCardT> = useAppSelector(questionnairesSelector).questionnaires.questionnaires;
    const pagination:GridPaginationT = useAppSelector(questionnairesSelector).questionnaires.pagination;

    const [sidebarState, setSidebarState] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');

    const [sex, setSex] = useState<GridSearchParams["sex"] | undefined>(undefined);
    const [country, setCountry] = useState<GridSearchParams["country"] | undefined>('');
    const [city, setCity] = useState<GridSearchParams["city"] | undefined>('');
    const [serviceType, setServiceType] = useState<GridSearchParams["service_type"] | undefined>(undefined);
    const [responsibility, setResponsibility] = useState<GridSearchParams["responsibility"] | undefined>('');
    const [fromAge, setFromAge] = useState<GridSearchParams["from_age"] | undefined>('');
    const [toAge, setToAge] = useState<GridSearchParams["to_age"] | undefined>('');
    const [page, setPage] = useState<GridSearchParams["page"] | 1>(1);
    const [limit, setLimit] = useState<GridSearchParams["limit"] | 1>(20);


    const [findEmployeeSidebarState, setFindEmployeeSidebarState] = useState(false);
    // const [paginationLimitValue, setPaginationLimitValue] = useState(20);
    const [sortingTypeValue, setSortingTypeValue] = useState<GridSearchParams["order_by"]>('asc');
    const [indicator, setIndicator] = useState(20);
    const [globalIndicator, setGlobalIndicator] = useState(cards.length + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([1]);
    const [component, setComponent] = useState('questionnaires');
      useEffect(() => {
        let pages:Array<number> = [];
        for (let i = 1; i < (cards.length / limit) + 1; i++) {
            pages.push(i);
        }
        setPages(pages);
      }, [limit, cards]);

      const handleSexButtonChange = (value: string | undefined) => {
        if (value === 'Муж') setSex('male');
        if (value === 'Жен') setSex('female');
        if (value === 'Все') setSex(undefined);
      }

      useEffect(() => {
        dispatch(getEmployees({}));
        dispatch(getCountries({}));
    }, [])

    let employees = formatEmployeesToInChargeList(useAppSelector(employeesSelector).employees.data, 'name');

    const [employeesState, setEmployeesState] = useState<Array<DropdownItem> | []>([]);

    useEffect(() => {
        let employeesWithAll = employees;
        employeesWithAll.unshift({label: 'Не выбрано', value: ''});
        setEmployeesState(employeesWithAll);
    }, [useAppSelector(employeesSelector)]);

    let countries = formatCountriesToDropdownList(useAppSelector(countriesSelector));

    const [countryOptionsState, setCountryOptionsState] = useState<Array<DropdownItem> | []>([]);

    useEffect(() => {
        let countriesWithAll = countries.sort(function(a, b){
            if(a.value < b.value) { return -1; }
            if(a.value > b.value) { return 1; }
            return 0;
        });
        countriesWithAll.unshift({label: 'Не выбрано', value: ''});
        setCountryOptionsState(countriesWithAll);
    }, [useAppSelector(countriesSelector)]);

    const getCities =  (city: string) => {
        const token = localStorage.getItem('token');

        let url = new URL(`${domain}/utils/utils.cities`)
        url.search = new URLSearchParams({title : city}).toString();
        let request = url.toString();
        return fetchWithQueryParams(
            request,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
          }
        ).then(response => response.json()).then(data => {
            if (data.data !== undefined) {
                return data.data.map((item:any) => ({
                    label: item.value_ru,
                    value: item.value_ru,
                }));
            }

        });
    }
    const loadingOptions = (city:string, callback: any) => {
        (async () => {
            let cities = await getCities(city);
            callback(cities);
        })();
    }


    useEffect(() => {
        // console.log(searchInputValue, ' ', sex,' ', country, ' ', city, ' ', serviceType, ' ', responsibility, ' ', page, ' ',limit, ' ', fromAge, ' ', toAge);
        dispatch(getQuestionnaires({
            search: searchInputValue,
            responsibility: responsibility,
            sex,
            country,
            city,
            service_type: serviceType,
            page,
            limit,
            from_age: fromAge,
            to_age: toAge,
            is_archive: component === 'archive' ? true : false,
            order_by: sortingTypeValue
        }));
    }, [searchInputValue,sex, country, city, serviceType, responsibility, page, limit, fromAge, toAge, component, sortingTypeValue]);

    const [findUsersState, setFindUsersState] = useState<GridSearchParams>({
        search: '',
        responsibility: '',
        sex: undefined,
        country: '',
        city: '',
        service_type: '',
        page: page,
        limit: limit,
        from_age: '',
        to_age: '',
        is_archive: component === 'archive' ? true : false,
        order_by: sortingTypeValue
    });

    const isLoading = useAppSelector(questionnairesSelector).questionnairesIsLoading;

    return (
        <Scrollbar>
            <div className={'page'}>
                <div className={'filtersHeaderWrapper'}>
                    <Container>
                        <div
                            className={`filtersHeaderContainer  ${styles.filterHeaderContainerMargin}`}
                        >
                            <div
                                className={`filterHeaderContainer`}>
                            <span className={component === 'questionnaires' ?
                                    'filterHeaderActive' : 'filterHeader'}
                                    onClick={() => setComponent('questionnaires')}>
                                        Анкеты
                                </span>
                                <span className={component === 'archive' ?
                                    'filterHeaderActive' : 'filterHeader'}
                                    onClick={() => setComponent('archive')}>
                                        Архив
                                </span>
                                </div>

                            <div className={'mobileButtonsContainer'}>
                                <span onClick={() => setSidebarState(true)}>
                                    <img src="/buttons/find.svg"/>
                                </span>
                        </div>
                        </div>
                        <div className={styles.searchBar}>
                            <div className={styles.searchBarInputWrapper}>
                                <Input
                                    type={'text'}
                                    name={'employeesSearchbar'}
                                    id={'employeesSearchbar'}
                                    wrapperClasses={styles.searchBarInput}
                                    placeholder={'Поиск по ключевым словам'}
                                    onChange={(e) => setSearchInputValue(e.target.value)}
                                    value={searchInputValue}
                                    icon={'/icons/find.svg'}
                                />
                            </div>

                            <div className={styles.searchBarDropdownWrapper}>
                                <Select
                                    placeholder={'Ответственный'}
                                    options={employeesState}
                                    onChange={(event) => setResponsibility(event.value)}
                                />
                            </div>
                            <div className={styles.searchBarDropdownWrapper}>
                                <Select
                                    options={clientMenuOptionsGrid}
                                    placeholder={'Статус анкеты'}
                                    onChange={(event) => setServiceType(event.value)}
                                />
                            </div>
                        </div>
                        <div className = {styles.filtersRow}>

                            {/* <div className={styles.inputFiltersContainer}> */}
                            <div className ={styles.item}>
                                <ButtonsMenu
                                        buttons={['Все', 'Муж', 'Жен']}
                                        defaultValue={'Все'}
                                        handleValueChange={handleSexButtonChange}
                                />
                            </div>

                            <div className ={styles.item}>
                                <div className={styles.wrapper}>
                                    <Input
                                        type={'text'}
                                        name={'ageFrom'}
                                        id={'ageFrom'}
                                        placeholder={'Возраст от'}
                                        wrapperClasses={styles.ageFrom}
                                        onChange={event => setFromAge(event.target.value)}
                                    />
                                    <div className={styles.separatorWrapper}>
                                        <img src="/icons/separator.svg"/>
                                    </div>
                                    <Input
                                        type={'text'}
                                        name={'ageTo'}
                                        id={'ageTo'}
                                        placeholder={'До'}
                                        wrapperClasses={styles.ageTo}
                                        onChange={event => setToAge(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className ={styles.item}>
                                <Select
                                    options={countryOptionsState}
                                    placeholder={'Страна'}
                                    onChange={(event) => setCountry(event.value)}
                                />
                            </div>

                            <div className ={styles.item + ' ' + styles.fixedWidth}>
                                <AsyncSelect
                                    placeholder={'Город'}
                                    searchable
                                    loadingOptions={debounce(loadingOptions, 500)}
                                    // loadingOptions={loadingOptions}
                                    onChange={(event) => setCity(event.value)}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
                <Separator style={{backgroundColor: '#dee2e6'}}/>
                <div className={'tableContentWrapper'}>
                    <Container mobileFull>
                        <div className={'tableHeader'}>
                            <div className={'pagginationPanel'}>
                                <UncontrolledDropdown placeholder={'Показывать по'}
                                        classes={styles.snowMore}
                                        defaultValue={'20'}
                                        placeholderStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        valueStyle={{fontSize: '14px', lineHeight: '135%'}}
                                        toggleWrapperStyle={{paddingLeft: 0, paddingRight: 0}}
                                        delimiter
                                        onChange={(value) => setLimit(Number(value))}
                                        iconStyle={{paddingLeft: '.5rem'}}
                                        isPlaceholderFixed={true}
                                        icon={'/icons/arrow.svg'}
                                        options={['20','40','60','80']}
                                        >
                                </UncontrolledDropdown>
                                <div className={'item'}>
                                    <span>{limit * (currentPage - 1) + 1}-{limit * (currentPage )} из {globalIndicator}</span>
                                </div>
                            </div>
                            <div className={'sortFiltersContainer'}>
                                <UncontrolledDropdown placeholder={'Сортировка'}
                                        placeholderClasses={styles.hideSortPlaceholder}
                                        defaultValue={'Сначала новые'}
                                        delimiter
                                        onChange={(value) => {
                                            if (value === 'Сначала новые') setSortingTypeValue('asc');
                                            if (value === 'Сначала старые') setSortingTypeValue('desc');
                                        }}
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
                    </Container>
                    {isLoading ?
                        cards.length > 0 ?
                            <>
															<UserCards
																cards={cards}
																limit = {limit}
																begin = {Number()}
															/>
															{
																limit < cards.length ? (
																	<div className={'pagination'}>
																		<div className={'row'}>
																			<button
																				className={'arrowBtn' + ' ' + 'back'}
																				onClick={() => {
																					setCurrentPage(currentPage - 1 < 0 ? currentPage: currentPage - 1)
																				}} disabled={currentPage - 1 < 1}
																			>
																				<img src="/icons/arrow_left.svg"/>
																			</button>
																			{pages.map((item:number, i) => {
																				return <button
																					className={'pagItem' + ` ${item === currentPage ? 'activePagItem' : ''}`}
																					key={'pagBtn' + item}
																					onClick={() => {
																						setCurrentPage(item)
																					}}>{item}</button>
																			})}
																			<button
																				className={'arrowBtn' + ' ' + 'fourth'}
																				onClick={() => {
																					setCurrentPage(currentPage + 1)
																				}} disabled={currentPage + 1 > cards.length / limit}
																			>
																				<img src="/icons/arrow_right.svg"/>
																			</button>
																			{' '}
																		</div>
																	</div>
																) : null
															}

														</>
                            :
                            <NotFound/>
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
                <FindUsers
                    isOpen={sidebarState}
                    setState={setSidebarState}
                    component={component}
                    search={{
                        state: searchInputValue,
                        setState: setSearchInputValue
                    }}
                    responsibility={{
                        state: responsibility,
                        setState: setResponsibility
                    }}
                    sex={{
                        state: sex,
                        setState: setSex
                    }}
                    country={{
                        state: country,
                        setState: setCountry
                    }}
                    city={{
                        state: city,
                        setState: setCity,
                        loadingOptions: loadingOptions
                    }}
                    service_type={{
                        state: serviceType,
                        setState: setServiceType
                    }}
                    from_age = {{
                        state: fromAge,
                        setState: setFromAge
                    }}
                    to_age =  {{
                        state: toAge,
                        setState: setToAge
                    }}
                    is_archive = {component === 'archive'}
                    page={page}
                    limit={limit}
                    order_by={sortingTypeValue}
                    employeesState={employeesState}
                    countryOptionsState={countryOptionsState}
                    indicator={cards.length}
                />

                </div>
            </div>
        </Scrollbar>
    )
}

export default Questionnaires;