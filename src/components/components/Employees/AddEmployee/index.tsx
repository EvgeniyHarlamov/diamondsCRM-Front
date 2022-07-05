import { Field, Formik, useFormik } from 'formik';
import { defaultDropdownState, employeesDropdown, employeesDropdownWithoutDefault } from '../../../../constants';
import Button from '../../../UIKit/Button';
import Input from '../../../UIKit/Input';
import Sidebar from '../../../UIKit/Sidebar';
import UncontrolledDropdown from '../../../UIKit/UncontrolledDropdown';
import Select from '../../../UIKit/Select';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { employeeErrorsSelector, clearErrors, createEmployee, getEmployees} from '../../../../features/employeesSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { defaultValidation, validateEmail } from '../../../../utils/validations';

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
}

function AddEmployee({isOpen, setState}:PropsT) {
    const dispatch = useAppDispatch();
    const errors = useSelector(employeeErrorsSelector);

    useEffect(() => {
        if (errors !== '') {
            toast.error(errors);
            dispatch(clearErrors());
          }
    }, [errors]);

    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'Добавить сотрудника'}
        >
                <div className={'formList'}>
                    <Formik
                         initialValues = {
                            {
                                name: '',
                                role: '',
                                email: '',
                                phone: ''
                            }
                        }
                        onSubmit = {() => dispatch(getEmployees({}))}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                         {({
                            values,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            submitForm
                    }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            as={Input}
                            name={'name'}
                            placeholder={'Введите имя сотрудника'}
                            label={'Имя'}
                            onChange={handleChange}
                            value={values.name}
                            wrapperClasses = {'item'}
                            // validate={defaultValidation}
                        />
                        <Select
                            placeholder={'Выберите роль сотрудника'}
                            options={employeesDropdownWithoutDefault}
                            className={'item'}
                            label={'Роль'}
                            onChange={(event:any) => setFieldValue('role', event.value)}
                        />
                        <Field
                            as={Input}
                            placeholder={'Введите email сотрудника'}
                            onChange={handleChange}
                            value={values.email}
                            name={'email'}
                            label={'Email'}
                            wrapperClasses = {'item'}
                            // validate={validateEmail}
                        />
                        <Field
                            as={Input}
                            placeholder={'Введите номер телефона сотрудника'}
                            onChange={handleChange}
                            value={values.phone}
                            label={'Номер телефона'}
                            type={'phone'}
                            name={'phone'}
                            mask={"+7 (999) 999-99-99"}
                            wrapperClasses = {'item'}
                            // validate={defaultValidation}
                        />
                        <div className={'sidebar-footer'}>
                                <div className={'btns-container'}>
                                    <Button
                                        onClick={() =>
                                            {
                                                let role:number = values.role === 'Администратор' ? 1 : 2;
                                                dispatch(createEmployee({...values, role: role}))
                                                submitForm();
                                                setState(false);
                                            }
                                        }
                                        color={'green'}
                                        className={'sidebar-button'}
                                    >
                                        Добавить сотрудника
                                    </Button >
                                    <Button
                                        onClick={() => setState(false)}
                                        color={'default'}
                                        className={'sidebar-button'}
                                        type={'button'}
                                    >
                                        Отменить
                                    </Button>
                                </div>
                        </div>
                    </form>
                    )}
                    </Formik>
                </div>
        </Sidebar>
    );
}

export default AddEmployee;