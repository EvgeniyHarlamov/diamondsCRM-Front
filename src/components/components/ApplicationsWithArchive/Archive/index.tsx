import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { applicationsSelector, getApplications } from '../../../../features/applicationsSlice';
import { ApplicationT } from '../../../../types/applications';
import formatClientName from '../../../../utils/format/formatClientName';
import generateTableData from '../../../../utils/generateTableData';
import Avatar from '../../../UIKit/Avatar';
import Container from '../../../UIKit/Container';
import UncontrolledDropdown from '../../../UIKit/UncontrolledDropdown';
import ArchiveTable from './ArchiveTable';
import styles from "./styles.module.scss";

type PropsT = {
    serviceFilter: string,
    searchInputValue: string
    setGlobalIndicator: (count:number) => void
    globalIndicator: number
    display: boolean
}

function Archive({serviceFilter, searchInputValue, globalIndicator, setGlobalIndicator, display}:PropsT) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getApplications({archive_only:true}));
    }, [])

    const archives = useAppSelector(applicationsSelector).applications_archive;


    const [paginationLimitValue, setPaginationLimitValue] = useState('20');

    const [sortingTypeValue, setSortingTypeValue] = useState('Сначала новые');


    const columnTemplateFull = [
        {
            Header: '#',
            accessor: 'id',
            id: 'id',
        },
        {
            Header: 'ИМЯ',
            accessor: 'client_name',
            id: 'client_name',
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
            Header: 'ОТВЕТСТВЕННЫЙ',
            accessor: 'inCharge',
            id: 'inCharge',
            disableSortBy: true
        },
        {
            accessor: 'service',
            id: 'service',
            filter: 'exactText'
        },
        {
            accessor: 'status',
            id: 'status',
        },
        {
            accessor: 'inChargeRaw',
            id: 'inChargeRaw',
        },
        {
            accessor: 'created_at',
            id: 'created_at',
        },
        {
            accessor: 'created_at_timestamp',
            id: 'created_at_timestamp',
        }
    ]

    const columns = useMemo(
        () => columnTemplateFull,
        []
    );

    const data = React.useMemo(() =>
            archives.map((client:ApplicationT) => {
                return {
                    id: client.id,
                    client_name: client.client_name,
                    email: client.email,
                    phone: client.phone,
                    service_type: client.service_type,
                    inCharge:
                    <div className={styles.inChargeWrapper}>
                        <Avatar value={client.responsibility ? client.responsibility.name : ''}/>
                        <div className={styles.inChargeName}>
                            {client.responsibility ? formatClientName(client.responsibility.name) : 'Нет сотрудника'}
                        </div>
                    </div>,
                    inChargeRaw: client.responsibility ? client.responsibility.name : '',
                    created_at: client.created_at,
                    created_at_timestamp: client.created_at_timestamp,
                    status: client.status,
                }
            })
        , [archives])

    const [indicator, setIndicator] = useState(0);

    return(
        <div className={styles.tableContentWrapper} style={{display: display ? 'block' : 'none'}}>
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
                <ArchiveTable
                    columns={columns}
                    data={data}
                    paginationLimit={paginationLimitValue}
                    sortingType={sortingTypeValue}
                    serviceFilter={serviceFilter}
                    searchInput={searchInputValue}
                    setIndicator={setIndicator}
                    setGlobalIndicator={setGlobalIndicator}
                />
            </Container>
        </div>
    );
}

export default Archive;