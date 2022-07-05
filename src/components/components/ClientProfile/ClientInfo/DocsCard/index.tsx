import download from 'downloadjs';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { domain } from '../../../../../constants';
import { ClearState, deleteFile, downloadFile, getQuestionnaires, questionnairesSelector, uploadFile, viewQuestionnaire } from '../../../../../features/questionnairesSlice';
import { DocCardT, FileT } from '../../../../../types';
import generateID from '../../../../../utils/generateID';
import Button from '../../../../UIKit/Button';
import styles from './styles.module.scss';


type PropsT = {
}

function DocsCard() {

    const dispatch = useAppDispatch();
    const userId:any = useParams();
    const docsOrigin:Array<FileT> = useAppSelector(questionnairesSelector).current.files.files;

    const filesFetched = useAppSelector(questionnairesSelector).filesFetched;

    useEffect(() => {
        if (filesFetched) {
            dispatch(viewQuestionnaire(userId));
            dispatch(ClearState());
        }
    }, [filesFetched]);

    const docs:Array<DocCardT> = [
        {
            header: 'Паспорт',
            file: docsOrigin.filter((file: FileT) => file.type === 'passport')[0]
        },
        {
            header: 'Согласие на обработку персональных данных',
            file: docsOrigin.filter((file: FileT) => file.type === 'agree')[0]
        },
        {
            header: 'Договор о оказании услуг',
            file: docsOrigin.filter((file: FileT) => file.type === 'offer')[0]
        },
        {
            header: 'Справка о доходах',
            file: docsOrigin.filter((file: FileT) => file.type === 'founder')[0]
        }
    ]

    const handleFileUpload = (event:any, setFieldValue:any) => {
        setFieldValue("file", event.currentTarget.files[0]);
    }

    const getType = (value: number) => {
        if (value === 0) return 'passport';
        if (value === 1) return 'agree';
        if (value === 2) return 'offer';
        if (value === 3) return 'founder';
    };

    const fileDownload= async (id: number, file_name: string) => {
        dispatch(downloadFile({
            questionnaire_id: Number(userId.id),
            file_id: id,
            file_name
        }))
    }

    const fileDelete= async (id: number) => {
        dispatch(deleteFile({
            questionnaire_id: Number(userId.id),
            file_id: id,
        }))
    }


    const init:any = {
        file: '',
        type: ''
    };

    return(
        <div className={styles.cardWrapper}>
            <div className={styles.MainInfoWrapper}>
                <span className={styles.name}>
                    Документы
                </span>
            </div>
            {docs.map((doc, i) =>
            (
                <div className={styles.docInfoWrapper}  key={generateID()}>
                    <div className={styles.header}>{doc.header}</div>
                    {doc.file ?
                        <div className={styles.docInfoContainer}>
                            <div className={styles.docIconContainer}>
                                <img className={styles.docIcon} src={"/icons/pdf_icon.png"}/>
                                <a
                                    className = {styles.link}
                                    onClick={() => fileDownload(doc.file.id, doc.file.name)}
                                >
                                    {doc.file.name}
                                </a><span>{` ${doc.file.size}`}</span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <span
                                    className={styles.button}
                                    onClick={() => fileDownload(doc.file.id, doc.file.name)}
                                >Cкачать</span>
                                <span
                                    className={styles.button}
                                    onClick={() => {
                                        fileDelete(doc.file.id)
                                    }}
                                >Удалить</span>
                            </div>
                        </div>
                            :
                        <Formik
                            initialValues = {init}
                            onSubmit = { (values) => {
                                let ext = ".pdf";
                                if (values.file.name.indexOf(ext) !== -1) {
                                    dispatch(uploadFile(
                                        {
                                            questionnaire_id: userId.id,
                                            file: values.file,
                                            type: values.type
                                        }
                                    ));
                                }
                                else {
                                    alert(`Неверный формат документов. Поддерживаемые форматы: ${ext}`);
                                }
                           }}
                        >
                            {({
                                    setFieldValue,
                                    submitForm
                            }) => (
                            <Button className={styles.detailsButton}>
                                <input
                                    type="file"
                                    id={`uploadDoc${i}`}
                                    name={`uploadDoc${i}`}
                                    onChange={(event) => {
                                        handleFileUpload(event, setFieldValue);
                                        setFieldValue('type', getType(i))
                                        submitForm();
                                    }}
                                    hidden
                                />
                                <label htmlFor = {`uploadDoc${i}`}>Загрузить документ</label>
                            </Button>
                        )}
                        </Formik>
                    }
                </div>
            ))}
        </div>
    )
}

export default DocsCard;