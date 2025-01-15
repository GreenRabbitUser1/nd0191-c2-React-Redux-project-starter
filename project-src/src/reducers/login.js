import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/login";


export function user(state = null, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return action.user;
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