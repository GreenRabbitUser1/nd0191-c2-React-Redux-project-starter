import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/login";
import { LOGOUT_USER } from "../actions/logout";
import { SAVE_USER } from "../actions/users";
import { ATTEMPT_RESTORE } from "../actions/login";

export function user(state = null, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return action.user;
        case LOGOUT_USER: 
            return null;
        case SAVE_USER: 
            return action.user;
        default: 
            return state;
    }

}

export function authDone(state = false, action){
    switch(action.type){
        case ATTEMPT_RESTORE: 
            return true;
        default:
            return state;
    }
}

export function authError(state = '', action){
    switch(action.type){
        case LOGIN_FAILURE:
            return action.error;
        default: 
            return state;
    }
}