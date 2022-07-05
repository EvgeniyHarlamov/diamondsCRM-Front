import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../../../UIKit/Avatar';
import styles from './styles.module.scss';
import Textarea from 'rc-textarea';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { addHistory, questionnairesSelector, resetCommentsIndicator } from '../../../../../features/questionnairesSlice';
import { requirePropFactory } from '@material-ui/core';
import TextArea from 'rc-textarea';
import Loader from "react-loader-spinner";

type PropsT = {
    id: string
}

type HandleKeyPressT = {
    event: any,
    setFieldValue:  (field: string, value: any) => void
    submitForm: () => Promise<void>;
}

function CommentInput({id}: PropsT) {
    const dispatch = useAppDispatch();
    const [currentValue, setCurrentValue] = useState("");
    const fetched = useAppSelector(questionnairesSelector).clearCommentInput;

    const handleKeyPress = ({event, setFieldValue,submitForm}:HandleKeyPressT) => {
        var key = event.which || event.keyCode;
        if (key == '13') {
            event.preventDefault();
            setFieldValue("comment", event.target.value);
            submitForm();
        }
    };


    const initData = {
        comment: ''
    };

    return(
        <div className={styles.boardInputCard}>
            <Avatar
                className={styles.avatar}
                value={'Николай Иванов'}
                fontSize={'16px'}
                height={'32px'}
                logoFontSize={'16px'}
            />
            <Formik
                initialValues = {initData}
                onSubmit = {(values, {setFieldValue}) => {
                    dispatch(addHistory({comment: values.comment, questionnaire_id: Number(id)}));

                    if (fetched) {
											setFieldValue("comment", "");
                        dispatch(resetCommentsIndicator());
                    }
                }}
            >
            {({
                submitForm,
                handleSubmit,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                    <Textarea
											id={"comment"}
                        value={currentValue}
                        autoSize={true}
                        placeholder={'Введите комментарий'}
                        onChange={(event:any) => {
                            setFieldValue('comment', event.target.value)
                            setCurrentValue(event.target.value);
                        }}
                        onKeyPress={(event:any) => handleKeyPress({event, setFieldValue, submitForm})}
                    />
									{/*<Loader*/}
									{/*	type="Oval"*/}
									{/*	color="#DCE5E6"*/}
									{/*	height={20}*/}
									{/*	width={20}*/}
									{/*	radius={5}*/}
									{/*/>*/}
                </form>
            )}
            </Formik>
        </div>
    )
}

export default CommentInput;