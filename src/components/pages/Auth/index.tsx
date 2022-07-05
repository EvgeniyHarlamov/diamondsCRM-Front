import { Field, Formik, FormikProvider } from 'formik';
import React, { useEffect } from 'react';
import Button from '../../UIKit/Button';
import Input from '../../UIKit/Input';
import styles from './styles.module.scss';
import Scrollbar from '../../UIKit/Scrollbar';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import { authSelector, loginUser, clearState } from '../../../features/authSlice';
import { validateEmail, defaultValidation } from '../../../utils/validations';
import toast, { Toaster } from 'react-hot-toast';


function Auth() {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const { isFetching, isSuccess, isError, errorMessage} = useSelector(
        authSelector
    );

    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);

      useEffect(() => {
        if (isError) {
          toast.error(errorMessage);
          dispatch(clearState());
        }
        if (isSuccess) {
          dispatch(clearState());
          history.push('/home');
        }
      }, [isError, isSuccess]);


    return(
        <Scrollbar>
            <div className={styles.page}>
                <div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
                <div className={styles.modalWrapper}>
                    <div className={styles.modalContainer}>
                        <div className={styles.logoWrapper}>
                            <img src="/icons/logo.png"/>
                        </div>
                        <div className={styles.title}>Авторизация</div>
                        <div className={'formList'}>
                            <Formik
                                initialValues = {
                                    {
                                        email: '',
                                        password: '',
                                    }
                                }
                                onSubmit = {(values) => {
                                    dispatch(loginUser(values))
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({
                                values,
                                handleChange,
                                handleSubmit,
                            }) => (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    as={Input}
                                    name={'email'}
                                    placeholder={'Введите email'}
                                    label={'Email'}
                                    onChange={handleChange}
                                    value={values.email}
                                    wrapperClasses = {'item'}
                                    validate={validateEmail}
                                />
                                <Field
                                    as={Input}
                                    type={'password'}
                                    placeholder={'Введите пароль'}
                                    onChange={handleChange}
                                    value={values.password}
                                    name={'password'}
                                    label={'Пароль'}
                                    wrapperClasses = {'item'}
                                    validate={defaultValidation}
                                />
                                <Button height={'48px'} margin = {'8px 0 0 0'} color={'green'} type={'submit'}>
                                    Войти в систему
                                </Button>
                            </form>
                            )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Scrollbar>
    )
}

export default Auth;