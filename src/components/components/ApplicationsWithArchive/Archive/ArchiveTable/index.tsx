import React, {FC, useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import {usePagination, useSortBy, useTable, useFilters} from "react-table";
import styles from "./styles.module.scss";
import { defaultDropdownState } from '../../../../../constants';
import ClientInfo from '../../ClientInfo';

type PropsT = {
    columns: any,
    data?: any
    paginationLimit: string,
    sortingType: string,
    serviceFilter: string
    searchInput: string,
    setIndicator: any
    setGlobalIndicator: any
}


function ArchiveTable ({
                        columns, data, paginationLimit,
                        sortingType, serviceFilter,
                        searchInput, setIndicator, setGlobalIndicator
                    }: PropsT) {

    const [pagSectionBegin, setPagSectionBegin] = useState(0);
    const [currentClientOpen, setCurrentClientOpen] = useState(false);
    const [currentClientData, setCurrentClientData] = useState(data[0]);

    const {
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        toggleSortBy,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable({
            columns,
            data,
            initialState: {
                pageIndex: 0,
                hiddenColumns: ['service', 'created_at', 'created_at_timestamp', 'inChargeRaw','status']
            },
            useFilters,
            autoResetPage: true,
        },
        useFilters,
        useSortBy,
        usePagination,
    );

    useEffect(() => {
        setPageSize(Number(paginationLimit));
    }, [paginationLimit]);

    useEffect(() => {
        setFilter('client_name', searchInput.toLowerCase());
    }, [searchInput]);

    useEffect(() => {
        if (serviceFilter === defaultDropdownState) setFilter('service', '');
        else setFilter('service', serviceFilter);
    }, [serviceFilter]);

    useEffect(() => {
        if (sortingType === 'Сначала новые') toggleSortBy('created_at_timestamp', true);
        else toggleSortBy('created_at_timestamp', false);
    }, [sortingType]);

    useEffect(() => {
        toggleSortBy('id', false);
        setPageSize(20);
    }, [])

    useEffect(() => {
        setIndicator(pageIndex);
        setGlobalIndicator(pageCount * pageSize)
    }, [pageIndex, pageCount])

    useEffect(() => {
        if (pageIndex % 5 === 0) {
            setPagSectionBegin(pageIndex)
        } else {
            setPagSectionBegin(pageIndex - pageIndex % 5)
        }
    }, [pageIndex])

    const rowHandler = (row:object) => {
        setCurrentClientData(row);
        setCurrentClientOpen(true);
    }

    return (
        <>
            <Table hover responsive className={styles.table}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={() => rowHandler(row.original)}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div className={'pagination'}>
                <div className={'row'}>
                    <button
                        className={'arrowBtn' + ' ' + 'back'}
                        onClick={() => {
                            previousPage()
                        }} disabled={!canPreviousPage}>
                        <img src="/icons/arrow_left.svg"/>
                    </button>
                    {pageOptions.slice(pagSectionBegin, pagSectionBegin + 5)
                        .map((item, i) => {
                            return <button
                                className={'pagItem' + ` ${item === pageIndex ? 'activePagItem' : ''}`}
                                key={'pagBtn' + item}
                                onClick={() => {
                                    gotoPage(item)
                                }}>{item + 1}</button>
                        })}
                    <button
                        className={'arrowBtn' + ' ' + 'fourth'}
                        onClick={() => {
                            nextPage()
                        }} disabled={!canNextPage}>
                        <img src="/icons/arrow_right.svg"/>
                    </button>
                    {' '}
                </div>
            </div>
            <ClientInfo
                isOpen={currentClientOpen}
                clientRecord={currentClientData}
                setState={setCurrentClientOpen}
                isArchive={true}
            />
        </>
    );
}

export default ArchiveTable;