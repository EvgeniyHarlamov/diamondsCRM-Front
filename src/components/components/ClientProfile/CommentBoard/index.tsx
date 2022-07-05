import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { clearErrors } from '../../../../features/employeesSlice';
import { getHistory, questionnairesSelector, ClearState, addInitialComments } from '../../../../features/questionnairesSlice';
import { CommentCardT } from '../../../../types';
import { CommentT } from '../../../../types/questionnaires';
import generateID from '../../../../utils/generateID';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import {Simulate} from "react-dom/test-utils";
import Loader from "react-loader-spinner";

type PropsT = {}

function CommentBoard() {
    const id:any = useParams();
    const dispatch = useAppDispatch();

    const commentsFetched = useAppSelector(questionnairesSelector).commentsFetched;
    const comments: Array<CommentT> = useAppSelector(questionnairesSelector).comments;
    const userdata = useAppSelector(questionnairesSelector).current;

    // useEffect(() => {
    //     dispatch(getHistory({questionnaire_id: id.id}));
    // }, [])

    useEffect(() => {
        if (commentsFetched) {
            dispatch(getHistory({questionnaire_id: id.id}));
            dispatch(ClearState());
        }
    }, [commentsFetched]);

    useEffect(() => {
        dispatch(addInitialComments({data: userdata.histories}));
    }, [])

    return(
        <div>
            <CommentInput id = {id.id}/>
					{
						comments.map((comment:CommentT) => {
							return (
								<CommentCard key={generateID()} card={comment}/>
							)
						})
					}
        </div>
    );
}

export default CommentBoard;