import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { domain, rootDomain } from '../../../../../constants';
import { ClearState, deletePhoto, questionnairesSelector, viewQuestionnaire } from '../../../../../features/questionnairesSlice';
import { PhotoCardT } from '../../../../../types';
import generateID from '../../../../../utils/generateID';
import Button from '../../../../UIKit/Button';
import styles from './styles.module.scss';
import UploadPhoto from './UploadPhoto';


type PropsT = {}

function PhotoCard() {
    const dispatch = useAppDispatch();
    const userID: any = useParams();
    const photosPaths:Array<PhotoCardT> = useAppSelector(questionnairesSelector).current.files.photos;

    let photos = photosPaths.map((item: PhotoCardT) => {{
        return {
            path: item ? item.path : '',
            id: item ? item.id : -1.
        }
    }});
    const photosFetched = useAppSelector(questionnairesSelector).photosFetched;

    useEffect(() => {
        if (photosFetched) {
            dispatch(viewQuestionnaire(userID));
            dispatch(ClearState());
        }
    }, [photosFetched]);


    return(
        <div className={styles.cardWrapper}>
            <div className={styles.MainInfoWrapper}>
                <span className={styles.name}>
                    Фотографии
                </span>
            </div>
            <div className={styles.photosWrapper}>
            {
                photos.map((photo,i) =>
                (
                        <div className={styles.photoWrapper} key={generateID()}>
                            <img src={`${rootDomain}/${photo.path}`}/>
                            <div className={styles.removePhoto}>
                                <div className={styles.imgWrapper}>
                                    <img src ={'/icons/removePhoto.png'} onClick={() => dispatch(deletePhoto({questionnaire_id: Number(userID.id), photo_id: photo.id }))}/>
                                </div>
                            </div>
                        </div>
                ))
            }
            {photos.length < 6 && <UploadPhoto key={generateID()}/>}
            </div>
        </div>
    )
}

export default PhotoCard;