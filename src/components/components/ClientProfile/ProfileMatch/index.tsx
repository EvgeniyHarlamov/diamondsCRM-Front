import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getMatch, questionnairesSelector } from '../../../../features/questionnairesSlice';
import { MatchCardT } from '../../../../types';
import generateID from '../../../../utils/generateID';
import Container from '../../../UIKit/Container';
import NotFound from '../../../UIKit/NotFound';
import MatchInfo from '../Sidebars/MatchInfo';
// import MatchInfo from '../Sidebars/MatchInfo';
import MatchCard from './MatchCard';
import styles from './styles.module.scss';

type PropsT = {
    limit?: number,
    begin?: number
}

function ProfileMatch({limit}:PropsT) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useAppDispatch();
    const id:any = useParams();

    const isFetching = useAppSelector(questionnairesSelector).matchIsFetched;
    const isLoaded = useAppSelector(questionnairesSelector).matchIsLoaded;
    const [pages, setPages] = useState([1]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getMatch({questionnaire_id: id.id, limit: 8, page: currentPage}));
    }, [isFetching, currentPage])

    const cards = useAppSelector(questionnairesSelector).match;
    const current = useAppSelector(questionnairesSelector).current;
    const currentMatch = useAppSelector(questionnairesSelector).currentMatch;

    const [paginationLimitValue, setPaginationLimitValue] = useState(8);

    useEffect(() => {
        let pages:Array<number> = [];
        for (let i = 1; i < (cards.length / paginationLimitValue) + 1; i++) {
            pages.push(i);
        }
        setPages(pages);
      }, [paginationLimitValue]);

    if (isLoaded) {
        return(
            <Container mobileFull>
                 <div className={styles.infoRow}>
                    <div className={styles.infoBar}>
                        <span>Подходящие девушки</span>
                        <div className={styles.pointWrapper}>
                            <div className={styles.point}></div>
                        </div>
                        <span>{`${cards.length} ${current.my_appearance.sex === 'Женщина'
                        ? 'женщин' : 'мужчин'}`}</span>
                    </div>
                    <div className={styles.tipsWrapper}>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/redTip.png"/>
                                </div>
                                <span>0-49</span>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/orangeTip.png"/>
                                </div>                            <span>50-89</span>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/greenTip.png"/>
                                </div>
                                <span>90-100</span>
                            </div>
                    </div>
                </div>
                {cards.length > 0 ?
                    <div className={styles.row}>
                        {cards.map((card,i) => {
                            if (i < Number(paginationLimitValue)) return (
                            <div className={styles.item} key={generateID()}>
                                <MatchCard
                                    card={card}
                                    openSidebar={() => setSidebarOpen(true)}
                                />
                            </div>)
                        })}
                    </div>
                    :
                    <NotFound/>
                }

							{limit && cards.length > limit ? (
								<div className={'pagination'}>
									<div className={'row'}>
										<button
											className={'arrowBtn' + ' ' + 'back'}
											onClick={() => {
												setCurrentPage(currentPage - 1 < 0 ? currentPage: currentPage - 1)
											}} disabled={currentPage - 1 < 1}
										>
											<img src="/icons/arrow_left.svg"/>
										</button>
										{pages.map((item:number, i) => {
											return <button
												className={'pagItem' + ` ${item === currentPage ? 'activePagItem' : ''}`}
												key={'pagBtn' + item}
												onClick={() => {
													setCurrentPage(item)
												}}>{item}</button>
										})}
										<button
											className={'arrowBtn' + ' ' + 'fourth'}
											onClick={() => {
												setCurrentPage(currentPage + 1)
											}} disabled={currentPage + 1 > cards.length / Number(paginationLimitValue)}
										>
											<img src="/icons/arrow_right.svg"/>
										</button>
										{' '}
									</div>
								</div>
							) : null}
                    <MatchInfo
                        isOpen = {sidebarOpen}
                        setState = {setSidebarOpen}
                        matchInfo = {currentMatch}
                    />
            </Container>

        )
    }

    return (
        <div className={'loaderWrapperTop'}>
					<Loader
						type="Hearts"
						color="rgb(236, 154, 41)"
						height={100}
						width={100}
					/>
        </div>
    )

}

export default ProfileMatch;