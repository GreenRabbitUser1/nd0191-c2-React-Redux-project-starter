import * as API from '../../_DATA';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function attemptLogin({username, password}){
    return async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        try {
            const response = await API._getUsers();
            if (!response || response === null){
                dispatch({
                    type: LOGIN_FAILURE,
                    error: 'Did not find any users'
                });
                return false;

            }
            const user = response[username];
            if (!user || user === null){
                dispatch({
                    type: LOGIN_FAILURE,
                    error: 'Did not find user matching this username'
                });
                return false;
            }
            //  Check if the password matches
            if (user.password !== password){
                dispatch({
                    type: LOGIN_FAILURE,
                    error: 'Password did not match'
                });
                return false;
            }
            //  SUCCESS! Username and password matches, user has been authenticated
            const sessionToken = await fetch('/api/generateJWT', {
                body: JSON.stringify({username, password}),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('sessionToken:', sessionToken);
            localStorage.setItem('udacity-fianl-project-token', sessionToken);
            const lst = localStorage.getItem('udacity-fianl-project-token');
            console.info(lst);
            // console.info('lst: ', lst);
            dispatch({
                type: LOGIN_SUCCESS,
                user
            });
            return true;

        } catch(error) {
            dispatch({
                type: LOGIN_FAILURE,
                error: error.message
            })
            return false;

        }
       
    }
}