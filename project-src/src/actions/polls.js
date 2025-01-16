export const ADD_POLL = 'ADD_POLL';
export const GET_POLLS = 'GET_POLLS';

import * as API from '../../_DATA.js';

export function addPoll(){
    return async (dispatch) => {
        //  No need to create route on server side since database/apis are in _DATA.js
        //  Make 
    }
}

export function getPolls(){
    return async (dispatch) => {
        const polls = await API._getQuestions();
        console.log('polls: ', polls);
        dispatch({
            type: GET_POLLS,
            polls
        });
    }
}