import { ADD_USER, GET_USERS } from "../actions/users";

export function users(state = [], action){
    switch(action.type){
        case GET_USERS:
            return action.users;
        default: 
            return state;
    }

}
