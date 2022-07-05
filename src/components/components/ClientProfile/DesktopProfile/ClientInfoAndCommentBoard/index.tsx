import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { questionnairesSelector } from '../../../../../features/questionnairesSlice';
import { ClientT, CommentCardT, DocCardT, FileT, PhotoCardT, SectionT } from '../../../../../types';
import Container from '../../../../UIKit/Container';
import ClientInfo from '../../ClientInfo';
import CommentBoard from '../../CommentBoard';
import styles from './styles.module.scss';

function ClientInfoAndCommentBoard() {
    const isFetched = useAppSelector(questionnairesSelector).isFetched;
;

    if (isFetched) {
        return(
            <Container>
                <div className={styles.wrapper}>
                        <div className={styles.column}>
                            <ClientInfo/>
                        </div>
                        <div className={styles.column}>
                            <CommentBoard/>
                        </div>
                </div>
            </Container>

        )
    }
    return(<></>)

}

export default ClientInfoAndCommentBoard;