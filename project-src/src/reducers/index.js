//  Combine all the reducers into a single reducer 
import { combineReducers } from 'redux';
import { user, authError, authDone } from'./login';
import { polls } from'./polls';
import { users } from './users'; 
import { loading } from './loading';

export default combineReducers({
    user,
    users,
    authError,
    authDone,
    polls,
    loading
})