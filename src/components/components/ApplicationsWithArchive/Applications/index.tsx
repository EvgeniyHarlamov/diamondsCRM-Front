import React, { useEffect, useLayoutEffect, useState } from 'react';
import Container from '../../../UIKit/Container';
import Board, { moveCard, changeColumn } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import './styles.scss';
import Column from './Column';
import Card from './Card';
import findWithAttr from '../../../../utils/findWithAttr';
import generateTableData from '../../../../utils/generateTableData';
import ClientInfo from '../ClientInfo';
import { ClientRecordT } from '../../../../types';
import { GetApplicationsT } from '../../../../types/applications';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { applicationsSelector, changeApplication, clearErrors, getApplications } from '../../../../features/applicationsSlice';
import { ApplicationT } from '../../../../types/applications';


type PropsT = {
  display: boolean
  searchInputValue: string
  serviceFilterValue: string
}

function Applications({display, searchInputValue, serviceFilterValue}:PropsT) {


  const dispatch = useAppDispatch();
  useEffect(() => {
    let body:GetApplicationsT = {};
    if (searchInputValue.length > 0) body.search = searchInputValue;
    if (serviceFilterValue !== '') body.responsibility_id = serviceFilterValue;
    dispatch(getApplications(body));
  }, [serviceFilterValue, searchInputValue])

  let isFetching = useAppSelector(applicationsSelector).isFetching;

  useEffect(() => {
    if (isFetching) {
      dispatch(getApplications({}))
      dispatch(clearErrors());
    }
  }, [isFetching]);


  let fetchedData = useAppSelector(applicationsSelector).applications;

  const [currentClientOpen, setCurrentClientOpen] = useState(false);
  const [currentClientData, setCurrentClientData] = useState(fetchedData[0]);


  let initBoard = {
    columns: [
      {
        id: 0,
        title: "Первый контакт",
        desc: 0,
        style: 'firstContact',
        cards: []
      },
      {
        id: 1,
        title: "В работе",
        style: 'inWork',
        desc: 0,
        cards: []
      },
      {
        id: 2,
        title: "Платеж",
        style: 'pay',
        desc: 0,
        cards: []
      },
      {
        id: 3,
        title: "Оплачено",
        style: 'paid',
        desc: 0,
        cards: []
      }
    ]
  };

  const [board, setBoard] = useState(initBoard);

  useEffect(() => {
    let firstContact = fetchedData.filter(item => item.status === 0);
    let newColumn = {desc: firstContact.length, cards:firstContact};
    let newBoard = changeColumn(board, board.columns[0], newColumn);

    let inWork:Array<ApplicationT> = fetchedData.filter(item => item.status === 1);
    newColumn = {desc: inWork.length, cards:inWork};
    newBoard = changeColumn(newBoard, newBoard.columns[1], newColumn);

    let pay:Array<ApplicationT> = fetchedData.filter(item => item.status === 2);
    newColumn = {desc: pay.length, cards:pay};
    newBoard = changeColumn(newBoard, newBoard.columns[2], newColumn);

    let paid:Array<ApplicationT> = fetchedData.filter(item => item.status === 3);
    newColumn = {desc: paid.length, cards:paid};
    newBoard = changeColumn(newBoard, newBoard.columns[3], newColumn);

    setBoard(newBoard);
  }, [fetchedData])

  const getNewStatus = (destination:number) => {
    let newStatus: string = '';
    if (destination === 0) {
      newStatus = "Контакт";
    }
    if (destination === 1) {
      newStatus = "В работе";
    }
    if (destination === 2) {
      newStatus = "Платеж";
    }
    if (destination === 3) {
      newStatus = "Оплачено";
    }
    return newStatus;
  }

  const handleCardMove = (_card:any, source:any, destination:any) => {
    const updatedBoard:any = moveCard(board, source, destination);

    const sourceColumn = updatedBoard.columns[source.fromColumnId];
    const destColumn = updatedBoard.columns[destination.toColumnId];

    const changeSourceColumn:any =
    changeColumn(updatedBoard, sourceColumn, {desc: sourceColumn.desc - 1 < 0 ? 0 : sourceColumn.desc - 1});

    const changeDestColumn:any =
    changeColumn(changeSourceColumn, destColumn, {desc: destColumn.desc + 1});

    if (destination.toColumnId === 0) {
      let sourceColumnCards = changeDestColumn.columns[0].cards;
      let cardIndex = findWithAttr(sourceColumnCards, 'id', _card.id);
      sourceColumnCards[cardIndex] = {..._card, status: 0};
      let newBoard = {...changeDestColumn, cards: sourceColumnCards};
      dispatch(changeApplication({id: _card.id, status: 0}));
      setBoard(newBoard);
    }

    else {
      let destColumnCards = changeDestColumn.columns[destination.toColumnId].cards;
      let cardIndex = findWithAttr(destColumnCards, 'id', _card.id);
      // let newStatus:string = getNewStatus(destination.toColumnId);
      let newStatus:string = destination.toColumnId;
      destColumnCards[cardIndex] = {..._card, status: newStatus};
      let newBoard = {...changeDestColumn, cards: destColumnCards};
      dispatch(changeApplication({id: _card.id, status: destination.toColumnId}));
      setBoard(newBoard);
      // if (destination.toColumnId === 3) dispatch(getApplications({}));
    }
  }

  const handleCardRemove = (board:any, column:any, card:any) => {
  }

  return(
    <Container mobileFull style={{display: display ? 'block' : 'none'}}>
      <Board
      // @ts-ignore
        renderColumnHeader={({ title, desc, style}, removeColumn, renameColumn, addCard ) => <Column title={title} desc={desc} style={style}/>}

        renderCard={({id, status, client_name, responsibility, service_type, email, phone, created_at, link, link_active}:ApplicationT) =>

        <Card
          setBoard={setBoard}
          board = {board}
          clientRecord={{
            id,
            client_name,
            email,
            phone,
            status,
            service_type,
            responsibility,
            created_at,
            link,
            link_active
          }}
          setSidebar={(data:ApplicationT) => {
              setCurrentClientOpen(true);
              setCurrentClientData(data);
            }
          }
        />}
        onCardRemove={handleCardRemove}
        onCardDragEnd={handleCardMove}
        disableColumnDrag
      >
        {board}
      </Board>
      <ClientInfo
        isOpen={currentClientOpen}
        clientRecord={currentClientData}
        setState={setCurrentClientOpen}
        isArchive={false}
      />
    </Container>
);
}

export default Applications;


