import React, { useEffect, useState } from 'react';
import formatClientName from '../../../../../utils/format/formatClientName';
import Avatar from '../../../../UIKit/Avatar';
import styles from './styles.module.scss';
import {addCard, removeCard, changeColumn, moveCard} from '@lourenci/react-kanban';
import { ApplicationT } from '../../../../../types/applications';
import { useAppDispatch } from '../../../../../app/hooks';
import { startWorkApplication } from '../../../../../features/applicationsSlice';

type PropsT = {
    board: any,
    clientRecord: ApplicationT
    setBoard: (board: any) => void
    setSidebar: (data:ApplicationT) => void
}


function Card({board, clientRecord, setBoard,setSidebar}: PropsT) {
    const dispatch = useAppDispatch();
    const handleValue = (value: string) => {
        if (value === 'free') return 'Бесплатно ';
        if (value === 'paid') return 'Оплачено';
        if (value === 'pay') return 'На оплате ';
        if (value === 'vip') return 'VIP ';
    }


        const handleClick = (event: any) => {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
            let card:ApplicationT = clientRecord;
            const cards = board.columns[0].cards;
            const col1 = board.columns[0];
            const col2 = board.columns[1];

            let updatedBoard = removeCard(board, col1, card);

            updatedBoard =
            addCard(updatedBoard,col2, {...card, status: 1});

            const source = updatedBoard.columns[0];
            const dest = updatedBoard.columns[1];

            updatedBoard = changeColumn(updatedBoard, source, {desc: source.desc - 1 < 0 ? 0 : source.desc - 1});

            updatedBoard = changeColumn(updatedBoard, dest, {desc: dest.desc + 1});
            setBoard(updatedBoard);
            dispatch(startWorkApplication({id: card.id}));
        };

        return(
        <div className={styles.cardWrapper} onClick={() => {
                setSidebar(clientRecord)
            }
        }>
            <div className={styles.clientInfoWrapper}>
                <div className={styles.name}>{clientRecord.client_name}</div>
                <div className={styles.service}>{handleValue(clientRecord.service_type)}</div>
            </div>
            {
                clientRecord.status === 0 ?
                    <div className={styles.CardFooterFirstContact}>
                        <div className={styles.footerContainer}>
                            <div
                                className={styles.button}
                                onClick={handleClick}
                            >
                                Взять в работу
                            </div>
                            <div className={styles.timeWrapper}>
                                <span className={styles.time}>{clientRecord.created_at}</span>
                            </div>
                        </div>
                    </div>
            :
                <div className={styles.CardFooter}>
                    <div className={styles.wrapper}>
                            {clientRecord.responsibility && <Avatar value={clientRecord.responsibility.name} showSignature/>}
                        <div className={styles.timeWrapper}>
                            <span className={styles.time}>{clientRecord.created_at}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Card;