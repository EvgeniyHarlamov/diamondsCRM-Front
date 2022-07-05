import React, { useEffect, useState } from 'react';
import MobileProfile from '../../components/ClientProfile/MobileProfile';
import Navbar from '../../UIKit/Navbar';
import Scrollbar from '../../UIKit/Scrollbar';
import DesktopProfile from '../../components/ClientProfile/DesktopProfile';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addInitialComments, clearLink, questionnairesSelector, resetCurrent, viewQuestionnaire } from '../../../features/questionnairesSlice';
import Loader from 'react-loader-spinner';

function ClientProfile() {
    const id:any = useParams();

    const dispatch = useAppDispatch();
    const userdata = useAppSelector(questionnairesSelector).current;

    useEffect(() => {
        dispatch(viewQuestionnaire(id))
        dispatch(clearLink());
        return () => {dispatch(resetCurrent())}
    }, []);



    if (userdata.application) {
        return(
            <Scrollbar>
                <div className={'page'}>
                    <MobileProfile />
                    <DesktopProfile />
                </div>
            </Scrollbar>
        )
    }
    return (
        <div className={'loaderWrapper'}>
					<Loader
						type="Hearts"
						color="rgb(236, 154, 41)"
						height={100}
						width={100}
					/>
        </div>
    )
}

export default ClientProfile;