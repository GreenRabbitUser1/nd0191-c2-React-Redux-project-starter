export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';

import * as API from '../../_DATA.js';

export function addUser(){
    return async (dispatch) => {
        //  No need to create route on server side since database/apis are in _DATA.js
        //  Make 
    }
}

export function getUsers(){
    return async (dispatch) => {
        const users = await API._getUsers();
        console.log('users: ', users);
        dispatch({
            type: GET_USERS,
            users
        });
    }
}