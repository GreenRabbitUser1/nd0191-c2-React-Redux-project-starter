//  Combine all the reducers into a single reducer 
import { combineReducers } from 'redux';
import { user, authError } from'./login';
import { polls } from'./polls';
import { users } from './users'; 

export default combineReducers({
    user,
    users,
    authError,
    polls
})