import React, { useState } from 'react';
import { CommentCardT, DocCardT, PhotoCardT, ClientT, SectionT } from '../../../../types';
import Container from '../../../UIKit/Container';
import FullInfo from '../Sidebars/ClientFullInfo';
import CommentBoard from '../CommentBoard';
import DocsCard from '../ClientInfo/DocsCard';
import InfoCard from '../ClientInfo/ClientCard';
import PhotoCard from '../ClientInfo/PhotoCard';
import styles from './styles.module.scss';
import ClientCard from '../ClientInfo/ClientCard';
import PartnerCard from '../ClientInfo/PartnerCard';

function ClientProfileInfo() {

    return(
        <Container>
            <div className={styles.wrapper}>
                    <div className={styles.column}>
                        <ClientCard/>
                        <PhotoCard />
                        <PartnerCard />
                        <DocsCard/>
                    </div>
                    <div className={styles.column}>
                        <CommentBoard/>
                    </div>
            </div>
        </Container>
    )
}

export default ClientProfileInfo;