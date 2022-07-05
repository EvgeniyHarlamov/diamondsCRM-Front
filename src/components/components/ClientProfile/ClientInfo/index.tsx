import React, { useState } from 'react';
import { ClientT } from '../../../../types';
import FullInfo from '../Sidebars/ClientFullInfo';
import InfoCard from './ClientCard';
import PhotoCard from './PhotoCard';
import DocsCard from './DocsCard';
import ClientCard from './ClientCard';
import PartnerCard from './PartnerCard';

type PropsT = {}

function ClientInfo() {

    return(
        <>
            <ClientCard/>
            <PhotoCard/>
            <PartnerCard/>
            <DocsCard/>
        </>

    )
}

export default ClientInfo;