import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { ClearState, questionnairesSelector, uploadPhoto, viewQuestionnaire } from '../../../../../../features/questionnairesSlice';
import generateID from '../../../../../../utils/generateID';
import handleFileUpload from '../../../../../../utils/handleFIleUpload';
import originalStyles from '../styles.module.scss';

type PropsT = {}

function UploadPhoto({}:PropsT) {
    const userID:any = useParams();
    const dispatch = useAppDispatch();
    const init:any = {
        file: '',
    };



    const handleSubmit = (values:any) => {
        let exts = [".jpeg", ".jpg"];

        let isRightExt = false;
        for (let ext of exts) {
            if (values.file.name.indexOf(ext) !== -1) {
                isRightExt = true;
            }
        }
        if (isRightExt) {
            dispatch(uploadPhoto(
                {
                    questionnaire_id: userID.id,
                    file: values.file,
                }
            ));
        }
        else {
            alert(`Неверный формат фотографии. Поддерживаемые форматы: ${exts.join(' ')}`);
        }
    }

    return(
        <Formik
            initialValues = {init}
            onSubmit = {handleSubmit}
        >
        {({
                setFieldValue,
                submitForm
        }) => (
            <div className={originalStyles.uploadPhotoWrapper}>
                <input
                    type="file"
                    id={`uploadPhoto`}
                    name={`uploadPhoto`}
                    onChange={(event) => {
                        handleFileUpload(event, setFieldValue);
                        submitForm();
                    }}
                    hidden
                />
                <label htmlFor = {`uploadPhoto`} style={{cursor: 'pointer'}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3292 2.13003L12.6705 2.13003L12.6705 12.6706L2.1299 12.6706L2.1299 15.3294L12.6705 15.3294L12.6705 25.87L15.3292 25.87L15.3292 15.3294L25.8698 15.3294V12.6706L15.3292 12.6706L15.3292 2.13003Z" fill="#183032" opacity="0.5"/>
                </svg></label>
            </div>
    )}
    </Formik>
    )
}

export default UploadPhoto;