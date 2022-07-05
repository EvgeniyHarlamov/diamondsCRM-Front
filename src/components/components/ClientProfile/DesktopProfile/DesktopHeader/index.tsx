import React, { useEffect, useState } from 'react';
import { domain, rootDomain } from '../../../../../constants';
import { currentQ, PresentationT } from '../../../../../types/questionnaires';
import Avatar from '../../../../UIKit/Avatar';
import Button from '../../../../UIKit/Button';
import Container from '../../../../UIKit/Container';
import Separator from '../../../../UIKit/Separator';
import ServiceStatus from '../../../../UIKit/ServiceStatus';
import ServiceStatusDropdown from '../../../../UIKit/ServiceStatusDropdown';
import MakeData from '../../Sidebars/MakeDate';
import styles from './styles.module.scss';
import {createPresentation, getMatch, questionnairesSelector, setStatus, viewQuestionnaire} from '../../../../../features/questionnairesSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { startWork, viewApplication } from '../../../../../features/applicationsSlice';
import Loader from 'react-loader-spinner';

type PropsT = {
    setComponent: (status: string) => void
    component: string
    data: currentQ
}

function DesktopHeader({component, setComponent, data}:PropsT) {
    const id:any = useParams();
    const dispatch = useAppDispatch();
    const [makeDataSidebarOpen, setMakeDataSidebarOpen] = useState(false);
    const matchCounter = useAppSelector(questionnairesSelector).current.matched_count;
    const presentation = useAppSelector(questionnairesSelector).presentation;
    const [takeToWork, setTakeToWork] = useState(data.application.responsibility === null);

    const handleChangeStatus = async (status: string) => {
        dispatch(setStatus({
            questionnaire_id: id,
            status: status
        }));
    }

    const handleCreatePresentation = async () => {
        if (!presentation.link) {
            dispatch(createPresentation({questionnaire_id: id.id}));
        }
        else {
            window.open(presentation.link);
        }
    }


    return(
        <div className={'header' + ` ${styles.header}`}>
            <Container>
                <div className= {styles.wrapper}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.imgContainer}>
                            {data.files.photos[0] ?
                                <img src={`${rootDomain}/${data.files.photos[0].path}`}/>
                                :
                                <Avatar
                                    logoClass={styles.logoFill}
                                    logoFontSize={'40px'}
                                    value={data.my_information.name}
                                />
                            }

                        </div>
                        <div className={styles.mainInfoContainer}>
                            <h3>{data.my_information.name}</h3>
                            <div className={styles.inChargeContainer}>
                                <span className={styles.field}>Ответственный: </span>
                                {data.application && <Avatar className = {styles.inChargeName} value={data.application.responsibility ? data.application.responsibility.split(',')[1] : ''} showSignature fullName fontSize={'14px'} />}
                            </div>
                            <div className={styles.buttonWrapper}>
                                <ServiceStatusDropdown
                                    defaultService={data.application.service_type}
                                    onChange={(value:string) => {
                                        handleChangeStatus(value);
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.cityContainer}>
                        <span className={styles.field}>Место проживания</span>
                        <span className={styles.value}>
                            {data.my_information.city}
                        </span>
                    </div>
                    <div className={styles.birthplaceContainer}>
                        <span
                            className={styles.field}
                        >
                            Дата рождения
                        </span>
                        <span className={styles.value}>{data.my_information.birthday}</span>
                    </div>
                </div>
                <Separator/>
                <div className = {styles.buttonPanel}>
                    <div className={styles.infoButtons}>
                        <div className = {styles.infoButton + ` ${component === 'infoAndComments' ?  styles.active : ''}`}
                        onClick = {() => setComponent('infoAndComments')}>
                            Информация
                        </div>
                        <div className = {styles.infoButton + ` ${component === 'match' ?  styles.active : ''}`} onClick = {() => setComponent('match')}>
                            <span className={styles.title}>Подходящие анкеты</span>
                            <Avatar value={matchCounter} isNum/>
                        </div>
                    </div>
                    <div className={styles.targetButtons}>
                        <Button
                            className={styles.targetButton}
                            onClick={handleCreatePresentation}
                        >
                            {presentation.fetching ?
                                <span>Скачать презентацию</span>
                                    :
                                <Loader
                                    type="Oval"
                                    color="#DCE5E6"
                                    height={20}
                                    width={20}
                                />
                            }
                        </Button>
                        <Button className={styles.targetButton} onClick={() => setMakeDataSidebarOpen(true)}>
                            <span>Назначить свидание</span>
                        </Button>
                        {takeToWork && <Button
                            className={styles.targetButton + ' ' + styles.takeToWork}
                            onClick={() => {
                                dispatch(startWork({id: id.id}))
                                setTakeToWork(false);
                            }}
                            >
                            <span>Взять в работу</span>
                        </Button>}
                    </div>
                </div>
            </Container>
            <MakeData isOpen={makeDataSidebarOpen} setState={setMakeDataSidebarOpen} />
        </div>
    );
}

export default DesktopHeader;