import React from 'react';
import { CommentCardT } from '../../../../../types';
import Avatar from '../../../../UIKit/Avatar';
import styles from './styles.module.scss';
import parse from 'html-react-parser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import generateID from '../../../../../utils/generateID';
import { removeHistory } from '../../../../../features/questionnairesSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../app/hooks';
import { CommentT } from '../../../../../types/questionnaires';

type PropsT = {
    card: CommentT
}

function CommentCard({card}:PropsT) {
    const dispatch = useAppDispatch();
    let userID:any = useParams();
    let id: string = generateID();
    let popupMenu:any  =
    <div className={styles.descContainer}>
        <img src="/icons/desc.png"/>
    </div>;

    return(
        <div className={styles.boardCard}>
            <div className={styles.header}>
                <div className={styles.infoDesktop}>
                    <div className={styles.nameContainer}>
                        <Avatar
                            className={styles.avatar}
                            value={card.name}
                            fontSize={'16px'}
                            height={'32px'}
                            logoFontSize={'16px'}
                        />
                        <span>{card.name}</span>
                        <div className={styles.separator}>
                           <span>.</span>
                        </div>
                    </div>
                    <div className={styles.dateContainer}>
                        <span>{card.created_at}</span>
                    </div>
                </div>
                <div className={styles.infoMobile}>
                    <div className={styles.avatarAndNameContainer}>
                        <Avatar
                            className={styles.avatar}
                            value={card.name}
                            fontSize={'16px'}
                            height={'32px'}
                            logoFontSize={'16px'}
                        />
                        <div className={styles.nameAndDateContainer}>
                            <span className={styles.name}>{card.name}</span>
                            <span className={styles.date}>{card.created_at}</span>
                        </div>
                    </div>
                </div>
                <Popup
                    trigger={popupMenu}
                    position="bottom right"
                    repositionOnResize
                >
                    <div className={styles.popupMenuButton} onClick={() => {
                        dispatch(removeHistory({questionnaire_id: userID, history_id: card.id}))
                    }}>Удалить</div>
                </Popup>


            </div>
            <div>
                {parse(card.comment)}
            </div>
        </div>
    )
}

export default CommentCard;