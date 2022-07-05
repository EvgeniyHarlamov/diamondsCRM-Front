import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { employeesDropdown, employeesDropdownWithoutDefault, employeesDropdownWithoutDefaultWithInt } from "../../../../../constants";
import { archiveEmployee, clearErrors, employeeErrorsSelector, getEmployees, updateEmployeeData, updateEmployeePassword } from "../../../../../features/employeesSlice";
import { defaultValidation, validateEmail } from "../../../../../utils/validations";
import Button from "../../../../UIKit/Button";
import Input from "../../../../UIKit/Input";
import Select from "../../../../UIKit/Select";
import Sidebar from "../../../../UIKit/Sidebar";
import styles from './styles.module.scss';

type PropsT = {
    isOpen: boolean
    setState: (e:boolean) => void
    employeeRecord: {
        order: number,
        name: string
        roleRaw: number
        email: string
        phone: string
        created_at: string
    }
}

function EmployeeInfo ({isOpen, setState, employeeRecord}:PropsT) {
    const dispatch = useAppDispatch();
    const errors = useSelector(employeeErrorsSelector);

    // useEffect(() => {
    //     if (errors !== '') {
    //         toast.error(errors);
    //         dispatch(clearErrors());
    //       }
    // }, [errors])

    if (employeeRecord) {
        return (
            <Sidebar
                    isOpen = {isOpen}
                    title={`Сотрудник #${employeeRecord.order}`}
                    subtitle={`Создан ${employeeRecord.created_at}`}
                    onClose={() => {
                        setState(false)
                    }} >
                        <div className={'formList'}>
                        <Formik
                            initialValues = {
                                {
                                    name: employeeRecord.name,
                                    role: employeeRecord.roleRaw,
                                    email: employeeRecord.email,
                                    phone: employeeRecord.phone
                                }
                            }
                            onSubmit = {(values) => {
                                dispatch(getEmployees({}));
                            }}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {({
                            values,
                            handleSubmit,
                            setFieldValue,
                            submitForm
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                            >
                                <Field
                                    as={Input}
                                    placeholder={'Введите имя сотрудника'}
                                    label={'Имя'}
                                    wrapperClasses = {'item'}
                                    value={values.name}
                                    // validate={defaultValidation}
                                    name={'name'}
                                />
                                <Select
                                    options={employeesDropdownWithoutDefaultWithInt}
                                    placeholder={'Выберите роль сотрудника'}
                                    className={'item'}
                                    label={'Роль'}
                                    defaultValue={employeeRecord.roleRaw === 1 ?
                                        'Администратор' : 'Менеджер'}
                                    onChange={(event) => setFieldValue('role', event.value)}
                                />
                                <Field
                                    as={Input}
                                    placeholder={'Введите email сотрудника'}
                                    label={'Email'}
                                    wrapperClasses = {'item'}
                                    value={values.email}
                                    // validate={validateEmail}
                                    name={'email'}
                                />
                                <Field
                                    as={Input}
                                    placeholder={'Введите номер телефона сотрудника'}
                                    label={'Номер телефона'}
                                    type={'phone'}
                                    id={'sidebarTelephoneNumber'}
                                    mask={"+7 (999) 999-99-99"}
                                    wrapperClasses = {'item'}
                                    value={values.phone}
                                    name={'phone'}
                                />
                                <div className={`${styles.sidebarFooter} sidebar-table-footer`}>
                                    <div className={styles.saveButtonWrapper}>
                                            <Button
                                                color={'green'}
                                                className={styles.button}
                                                onClick={() => {
                                                    dispatch(updateEmployeeData({
                                                        name: values.name,
                                                        user_id: employeeRecord.order,
                                                        email: values.email,
                                                        phone: values.phone,
                                                        role: values.role
                                                    }));
                                                    submitForm();
                                                    setState(false);
                                                }}
                                            >
                                                Сохранить
                                            </Button >
                                    </div>
                                    <div className={styles.btnsContainer}>
                                        <Button
                                            color={'default'}
                                            className={'newPasswordButton sidebar-button'}
                                            onClick={() => {
                                                dispatch(updateEmployeePassword({
                                                    name: values.name,
                                                    user_id: employeeRecord.order,
                                                }));
                                                submitForm();
                                                setState(false);
                                            }}
                                        >
                                            Выслать новый пароль
                                        </Button >
                                        <Button
                                            onClick={() =>
                                            {
                                                dispatch(archiveEmployee({
                                                    user_id: employeeRecord.order
                                                }));
                                                submitForm();
                                                setState(false);
                                            }}
                                            color={'default'}
                                            className={'deleteEmployee sidebar-button'}
                                        >
                                            Удалить сотрудника
                                        </Button>
                                    </div>

                                </div>
                                </Form>
                        )}
                                </Formik>
                            </div>
                </Sidebar>
        );
    }
    return(<div></div>)
}

export default EmployeeInfo;
