import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { questionnairesSelector } from '../../../../features/questionnairesSlice';
import { ClientT, CommentCardT, DocCardT, PhotoCardT, SectionT } from '../../../../types';
import ClientInfo from '../ClientInfo';
import CommentBoard from '../CommentBoard';
import ProfileMatch from '../ProfileMatch';
import MakeData from '../Sidebars/MakeDate';
import MobileHeader from './MobileHeader';
import styles from './styles.module.scss';


function MobileProfile() {
    const current = useAppSelector(questionnairesSelector).current;

    const [componentType, setComponentType] = useState('comments');
    const [component, setComponent] = useState<React.ReactNode>(
        <CommentBoard />
    );

    useEffect(() => {
        if (componentType === 'comments') {
            setComponent(<CommentBoard />)
        }
        if (componentType === 'info') {
            setComponent(<ClientInfo />)
        }
        if (componentType === 'match') {
            setComponent(<ProfileMatch />)
        }
    }, [componentType])


    return (
        <div className={`${styles.wrapper}`}>
            <MobileHeader
                component={componentType}
                setComponent={setComponentType}
            />
            <div className={styles.wrapper}>
                {component}
            </div>
        </div>
    )
}

export default MobileProfile;