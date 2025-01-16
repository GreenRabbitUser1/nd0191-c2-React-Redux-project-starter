import { ADD_POLL, GET_POLLS } from "../actions/polls";

export function polls(state = [], action){
    switch(action.type){
        case GET_POLLS:
            console.log('action.polls:', action.polls);
            return action.polls;
        default: 
            return state;
    }
}
