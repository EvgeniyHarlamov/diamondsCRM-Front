import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { defaultDropdownState } from "../../../../constants";
import { ClientRecordT, DropdownItem } from "../../../../types";
import { ApplicationT } from "../../../../types/applications";
import Button from "../../../UIKit/Button";
import Input from "../../../UIKit/Input";
import Select from "../../../UIKit/Select";
import Sidebar from "../../../UIKit/Sidebar";
import UncontrolledDropdown from '../../../UIKit/UncontrolledDropdown';
import {applicationsErrorsSelector, applicationsSelector, clearErrors, deleteApplication, getApplications, updateApplication, viewApplication} from '../../../../features/applicationsSlice';
import convertClientStatusToString from "../../../../utils/convertClientStatusToString";
import styles from './styles.module.scss';
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

type PropsT = {
    isOpen: boolean
    setState: (e:boolean) => void
    clientRecord: ApplicationT
    isArchive: boolean
}

function EmployeeInfo ({isOpen, setState, clientRecord, isArchive}:PropsT) {
    const dispatch = useAppDispatch();
    const [copied, setCopied] = useState(false);
    const errors = useAppSelector(applicationsErrorsSelector);

    // useEffect(() => {
    //     if (errors !== '' && errors !== 'Анкета была архивирована' && errors !== 'Статус изменен' && errors !== 'Настройки сохранены') {
    //         toast.error(errors);
    //         dispatch(clearErrors());
    //       }
    // }, [errors]);

    const current = useAppSelector(applicationsSelector).current;
    useEffect(() => {
        if (clientRecord) dispatch(viewApplication({id: clientRecord.id}));
    }, [isOpen]);


    if (clientRecord) {

        const component:React.ReactNode =
        <>
            <label className={'label'}>Ссылка для прохождения анкеты</label>
            <div className ={styles.linkWrapper}>
                    <div className={styles.link}>{clientRecord.link}</div>
                    <div className={styles.img}>
                        <CopyToClipboard text={clientRecord.link ? clientRecord.link : ''}
                        onCopy={() => setCopied(true)}>
                            <img src="/icons/book.png" />
                        </CopyToClipboard>
                    </div>
            </div>
        </>;

        const menu:Array<DropdownItem> = [
            {
                value: '0',
                label: 'Контакт'
            },
            {
                value: '1',
                label: 'В работе'
            },
            {
                value: '2',
                label: 'Платеж'
            },
            {
                value: '3',
                label: 'Оплачено'
            }
        ];

        return (
            <Sidebar
                    useScrollbar={true}
                    isOpen = {isOpen}
                    bodyClass={styles.body}
                    title={`Клиент #${clientRecord.id}`}
                    subtitle={`Создан ${clientRecord.created_at}`}
                    onClose={() => {
                        setState(false)
                    }} >
                        <div className={'formList'}>
                        <Formik
                             initialValues = {
                                {
                                    name: clientRecord.client_name,
                                    status: clientRecord.status,
                                    email: clientRecord.email,
                                    phone: clientRecord.phone
                                }
                            }
                            onSubmit = {(values) => {
                                dispatch(getApplications({}));
                            }}
                        >
                             {({
                            values,
                            handleChange,
                            submitForm,
                            handleSubmit,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    as={Input}
                                    placeholder={'Введите имя сотрудника'}
                                    label={'Имя'}
                                    wrapperClasses = {'item'}
                                    value={values.name}
                                    name={'name'}
                                    disabled={isArchive}
                                />
                                <Field
                                    as={Input}
                                    placeholder={'Введите email клиента'}
                                    label={'Email'}
                                    wrapperClasses = {'item'}
                                    value={values.email}
                                    name={'email'}
                                    disabled={isArchive}
                                />
                                <Field
                                    as={Input}
                                    placeholder={'Введите номер телефона клиента'}
                                    label={'Номер телефона'}
                                    type={'phone'}
                                    id={'sidebarTelephoneNumber'}
                                    // mask={"+7 (999) 999-99-99"}
                                    wrapperClasses = {'item'}
                                    value={values.phone}
                                    name={'phone'}
                                    disabled={isArchive}
                                />
                                <Select
                                    defaultValue={convertClientStatusToString(clientRecord.status)}
                                    placeholder={'Выберите статус клиента'}
                                    onChange={(event: any) => setFieldValue('status', event.value)}
                                    className={'item'}
                                    label={'Статус'}
                                    options={menu}
                                    disabled={isArchive}
                                />
                                {!isArchive && current && current.link_active && component}
                                {!isArchive && <div className={styles.sidebarFooter + ' sidebar-footer sidebar-table-footer'}>
                                    <div className={'btns-container'}>
                                        <Button
                                            color={'green'}
                                            onClick={() => {
                                                dispatch(updateApplication({
                                                    id: clientRecord.id,
                                                    client_name: values.name,
                                                    email: values.email,
                                                    phone: values.phone,
                                                    status: Number(values.status)
                                                }));
                                                submitForm();
                                                setState(false);
                                            }}
                                        >
                                            Сохранить
                                        </Button >
                                        <Button
                                            color={'default'}
                                            onClick={() => {
                                                    dispatch(deleteApplication({id: clientRecord.id}));
                                                    submitForm();
                                                    setState(false);
                                                }
                                            }
                                        >
                                           Переместить в архив
                                        </Button >
                                    </div>
                                </div>
                                }
                                </form>
                                )}
                                </Formik>

                        </div>
                </Sidebar>
        );
    }
    return (<></>)

}

export default EmployeeInfo;