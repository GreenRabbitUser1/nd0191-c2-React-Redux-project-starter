import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/login";
import { LOGOUT_USER } from "../actions/logout";

export function user(state = null, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return action.user;
        case LOGOUT_USER: 
            return null;
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