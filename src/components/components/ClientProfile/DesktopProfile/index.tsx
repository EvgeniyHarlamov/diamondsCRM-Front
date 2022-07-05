import React, { useEffect, useState } from 'react';
import { CommentCardT, DocCardT, PhotoCardT, ClientT, SectionT } from '../../../../types';
import styles from './styles.module.scss';
import DesktopHeader from './DesktopHeader';
import ClientInfoAndCommentBoard from './ClientInfoAndCommentBoard';
import ProfileMatch from '../ProfileMatch';
import { useAppSelector } from '../../../../app/hooks';
import { questionnairesSelector } from '../../../../features/questionnairesSlice';
import Loader from 'react-loader-spinner';


function DesktopProfile() {
    const isFetched = useAppSelector(questionnairesSelector).isFetched;
    const current = useAppSelector(questionnairesSelector).current;

    const [componentType, setComponentType] = useState('infoAndComments');
    const [component, setComponent] = useState<React.ReactNode>(
        <ClientInfoAndCommentBoard />
    );
    const [paginationLimitValue, setPaginationLimitValue] = useState(20);

    useEffect(() => {
        if (componentType === 'infoAndComments') {
            setComponent(<ClientInfoAndCommentBoard />)
        }
        if (componentType === 'match') {
            setComponent(<ProfileMatch />)
        }
    }, [componentType])

    if (isFetched) {
        return (
            <div className={styles.wrapper}>
                <DesktopHeader
                    component={componentType}
                    setComponent={setComponentType}
                    data={current}
                />
                <div className={styles.wrapper}>
                    {component}
                </div>
            </div>
        )
    }
    return(
        <div className={'loaderWrapper'}>
					<Loader
						type="Hearts"
						color="rgb(236, 154, 41)"
						height={100}
						width={100}
					/>
        </div>);

}

export default DesktopProfile;