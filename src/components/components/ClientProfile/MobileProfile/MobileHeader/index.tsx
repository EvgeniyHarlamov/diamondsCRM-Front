import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { rootDomain } from '../../../../../constants';
import { startWork } from '../../../../../features/applicationsSlice';
import { createPresentation, questionnairesSelector } from '../../../../../features/questionnairesSlice';
import { PresentationT } from '../../../../../types/questionnaires';
import Avatar from '../../../../UIKit/Avatar';
import Button from '../../../../UIKit/Button';
import Container from '../../../../UIKit/Container';
import Separator from '../../../../UIKit/Separator';
import ServiceStatus from '../../../../UIKit/ServiceStatus';
import ServiceStatusDropdown from '../../../../UIKit/ServiceStatusDropdown';
import MakeData from '../../Sidebars/MakeDate';
import styles from './styles.module.scss';

type PropsT = {
    setComponent: (status: string) => void
    component: string
}

function MobileHeader({component, setComponent}:PropsT) {
    const data = useAppSelector(questionnairesSelector).current;
    const matchCounter = useAppSelector(questionnairesSelector).current.matched_count;
    const dispatch = useAppDispatch();
    const id:any = useParams();
    const presentation = useAppSelector(questionnairesSelector).presentation;
    const [takeToWork, setTakeToWork] = useState(data.application.responsibility === null);

    const [makeDataSidebarOpen, setMakeDataSidebarOpen] = useState(false);

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
                            <div className={styles.buttonWrapper}>
                            <ServiceStatusDropdown
                                    defaultService={data.application ? data.application.service_type : 'free'}
                                    onChange={() => {}}
                                />
                        </div>
                        </div>

                        <div className={styles.mainInfoContainer}>
                            <h3>{data.my_information.name}</h3>
                            <div className={styles.inChargeContainer}>
                                {/* <span className={styles.field}>Ответственный: </span>
                                {data.application && <Avatar className = {styles.inChargeName} value={data.application.responsibility ? data.application.responsibility.split(',')[1] : ''} showSignature fullName fontSize={'14px'} />} */}
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
                        <span className={styles.field}>Дата рождения</span>
                        <span className={styles.value}>{data.my_information.birthday}</span>
                    </div>
                </div>
                <Separator/>
                <div className={styles.actionButtons}>
                    <Button
                        className={styles.downloadPresentButton}
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
                    <Button onClick={() => setMakeDataSidebarOpen(true)}>
                        <span>Назначить свидание</span>
                    </Button>
                    {data.application.responsibility === null &&
                    <Button
                        onClick={() => {
                                dispatch(startWork({id: id.id}));
                                setTakeToWork(false);
                            }
                        }
                        className={styles.takeToWorkButton}
                    >
                            <span>Взять в работу</span>
                        </Button>}
                </div>
            </Container>
            <div className={styles.tabsContainer}>
                    <div
                        className={`${styles.tab} ${component === 'comments' ? styles.tabActive : ''}`}
                        onClick={() => setComponent('comments')}
                    >
                        <span>Лента</span>
                    </div>
                    <div
                        className={`${styles.tab} ${component === 'info' ? styles.tabActive : ''}`}
                        onClick={() => setComponent('info')}
                    >
                        <span>Инфо</span>
                    </div>
                    <div
                        className={`${styles.tab} ${component === 'match' ? styles.tabActive : ''}`}
                        onClick={() => setComponent('match')}
                    >
                        <span>Анкеты</span>
                        <Avatar value={matchCounter} isNum/>
                    </div>
            </div>
            <MakeData isOpen={makeDataSidebarOpen} setState={setMakeDataSidebarOpen} />
        </div>
    );
}

export default MobileHeader;