import { ADD_POLL, GET_POLLS, SUBMIT_POLL_VOTE } from "../actions/polls";

export function polls(state = [], action){
    switch(action.type){
        case ADD_POLL:
            console.log('Added a new  poll');
        case SUBMIT_POLL_VOTE: 
            return state;
        case GET_POLLS:
            console.log('action.polls:', action.polls);
            return action.polls;
        default: 
            return state;
    }
}
