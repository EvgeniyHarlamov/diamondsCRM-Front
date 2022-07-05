import React, {FC, useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import {usePagination, useSortBy, useTable, useFilters} from "react-table";
import {defaultDropdownState} from '../../../../constants';
import EmployeeInfo from './EmployeeInfo/EmployeeInfo';
import styles from './styles.module.scss';

type PropsT = {
    columns: any,
    data?: any
    paginationLimit: string,
    sortingType: string,
    employeeRoleFilter: string
    searchInput: string,
    setIndicator: (value: number) => void
    setGlobalIndicator: (value: number) => void
    setCurrentEmpRowsCounter: (value: number) => void
}


function EmployeesTable ({columns, data, paginationLimit,
                                               sortingType, employeeRoleFilter,
                                               searchInput, setIndicator, setGlobalIndicator,
                                               setCurrentEmpRowsCounter
                                           }: PropsT) {

    const [pagSectionBegin, setPagSectionBegin] = useState(0);
    const [currentEmployeeOpen, setCurrentEmployeeOpen] = useState(false);
    const [currentEmployeeData, setCurrentEmployeeData] = useState(data[0]);

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
                hiddenColumns: ['roleRaw', 'created_at_timestamp', 'created_at']
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
        setFilter('name', searchInput.toLowerCase());
    }, [searchInput]);

    useEffect(() => {
        if (employeeRoleFilter === defaultDropdownState) setFilter('roleRaw', '');
        else {
            if (employeeRoleFilter === 'Администратор') setFilter('roleRaw', 1)
            else setFilter('roleRaw', 2);
        }
    }, [employeeRoleFilter]);

    useEffect(() => {
        if (sortingType === 'Сначала новые') toggleSortBy('created_at_timestamp', true);
        else toggleSortBy('created_at_timestamp', false);
    }, [sortingType]);

    useEffect(() => {
        toggleSortBy('order', false);
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
        setCurrentEmployeeData(row);
        setCurrentEmployeeOpen(true);
    }

    useEffect(() => {
        setCurrentEmpRowsCounter(page.length);
    }, [page.length]);

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
					{page.length > parseInt(paginationLimit) ? (
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
					) : null}
            <EmployeeInfo
                isOpen={currentEmployeeOpen}
                employeeRecord={currentEmployeeData}
                setState={setCurrentEmployeeOpen}
            />
        </>
    );
}

export default EmployeesTable;