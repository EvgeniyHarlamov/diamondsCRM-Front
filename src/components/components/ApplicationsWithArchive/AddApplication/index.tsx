import { Field, Formik, useFormik } from 'formik';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { clientDropdownMenuOptions, clientMenuOptions, clientMenuOptionsWithoutDefault, defaultDropdownState } from '../../../../constants';
import { createApplication, clearErrors, applicationsErrorsSelector, getApplications } from '../../../../features/applicationsSlice';
import Button from '../../../UIKit/Button';
import Input from '../../../UIKit/Input';
import Sidebar from '../../../UIKit/Sidebar';
import UncontrolledDropdown from '../../../UIKit/UncontrolledDropdown';
import styles from './styles.module.scss';
import Select from '../../../UIKit/Select';
import { defaultValidation, validateEmail } from '../../../../utils/validations';

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
}

function AddApplication({isOpen, setState}:PropsT) {
    const dispatch = useAppDispatch();
    const errors = useAppSelector(applicationsErrorsSelector);

    const handleServiceName = (value: string) => {
        if (value === 'Бесплатные услуги') return 'free';
        if (value === 'Платные услуги') return 'pay';
        return 'vip';
    }

    useEffect(() => {
        if (errors !== '' && errors !== 'Анкета была архивирована' && errors !== 'Статус изменен' && errors !== 'Настройки сохранены') {
            toast.error(errors);
            dispatch(clearErrors());
        }
    }, [errors]);

    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'Добавить клиента'}
        >
                <div className={'formList'}>
                    <Formik
                         initialValues = {
                            {
                                client_name: '',
                                service_type: '',
                                email: '',
                                phone: ''
                            }
                        }
                        onSubmit = {() => {}}
                        validateOnBlur={false}
                        validateOnChange={false}
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
                            name={'client_name'}
                            placeholder={'Введите имя клиента'}
                            label={'Имя'}
                            onChange={handleChange}
                            value={values.client_name}
                            wrapperClasses = {'item'}
                            // validate={defaultValidation}
                        />
                        <Field
                            as={Input}
                            placeholder={'Email клиента'}
                            onChange={handleChange}
                            value={values.email}
                            name={'email'}
                            label={'Email'}
                            wrapperClasses = {'item'}
                            // validate={validateEmail}
                        />
                        <Field
                            as={Input}
                            placeholder={'Введите номер телефона клиента'}
                            onChange={handleChange}
                            value={values.phone}
                            label={'Номер телефона'}
                            type={'phone'}
                            name={'phone'}
                            wrapperClasses = {'item'}
                            // validate={defaultValidation}
                        />
                        <Select
                            placeholder={'Выберите услугу'}
                            className = {'item'}
                            onChange={(event:any) => setFieldValue('service_type',
                            handleServiceName(event.value))}
                            label={'Услуга'}
                            options={clientMenuOptionsWithoutDefault}
                        />
                        <div className={'sidebar-footer'}>
                                <div className={'btns-container'}>
                                    <Button
                                        color={'green'}
                                        className={`${styles.button} sidebar-button`}
                                        onClick={() =>
                                            {
                                                dispatch(createApplication(values))
                                                setState(false);
                                            }
                                        }
                                    >
                                        Добавить клиента
                                    </Button >
                                    <Button
                                        onClick={() =>setState(false)}
                                        color={'default'}
                                        className={`${styles.button} sidebar-button`}
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

export default AddApplication;