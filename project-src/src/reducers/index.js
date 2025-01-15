//  Combine all the reducers into a single reducer 
import { combineReducers } from 'redux';
import { user, authError } from'./login';

export default combineReducers({
    user,
    authError
})