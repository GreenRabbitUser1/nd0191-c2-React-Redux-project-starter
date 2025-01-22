export const ADD_USER = 'ADD_USER';
export const GET_USERS = 'GET_USERS';
export const SAVE_USER = 'SAVE_USER';

import * as API from '../../_DATA.js';

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

export function saveUser(_user, _new_data){
    return async (dispatch) => {
        const user = await API._saveUser(_user, _new_data)
        dispatch({
            type: SAVE_USER,
            user
        });
    }
}