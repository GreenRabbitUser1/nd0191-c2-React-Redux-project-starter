export const ADD_POLL = 'ADD_POLL';
export const GET_POLLS = 'GET_POLLS';
export const SUBMIT_POLL_VOTE = 'SUBMIT_POLL_VOTE';

import { refreshUser } from './login.js';

import * as API from '../../_DATA.js';

export function addPoll(poll){
    return async (dispatch) => {
        const saved = await API._saveQuestion(poll);
        console.log('saved', saved);
        dispatch({
            type: ADD_POLL,
            saved
        });
    }
}

export function getPolls(){
    return async (dispatch) => {
        let polls = await API._getQuestions();
        //  sort the polls by which ones are unanswered by the current user first
        console.log('polls: ', polls);
        dispatch({
            type: GET_POLLS,
            polls
        });
    }
}

export function submitPollVote(user, poll_id, answer){
    return async (dispatch) => {
        console.group('Submitting poll vote');
        console.log('User', user);
        console.log('Poll ID', poll_id);
        console.log('Answer', answer);
        let test = await API._saveQuestionAnswer({
            authedUser: user.id,
            qid: poll_id,
            answer
        });
        console.log('Submitted vote');
        console.groupEnd();
        console.log('after submitPollVote API call (test)', test);
        dispatch({
            type: SUBMIT_POLL_VOTE
        });
        dispatch(getPolls());
        dispatch(refreshUser(user.id));
    }
}