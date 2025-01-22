import * as API from '../../_DATA';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SESSION_RESTORE = 'SESSION_RESTORE';
export const ATTEMPT_RESTORE = 'ATTEMPT_RESTORE';

export function setUser(user){
    return {
        type: LOGIN_REQUEST,
        user
    };
}

export function attemptLogin({username, password}){
    return async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        try {

            const {user, getUserError} = await getUser(username, password);
            if (getUserError && getUserError !== null){
                dispatch(getUserError);
                return false;
            }

            //  SUCCESS! Username and password matches, user has been authenticated
            let sessionToken = await fetch('/api/auth/generate-jwt', {
                body: JSON.stringify({username, password}),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (sessionToken.ok){
                sessionToken = await sessionToken.json();
                console.log('sessionToken:', sessionToken);
                localStorage.setItem('udacity-final-project-token', sessionToken);
                const lst = localStorage.getItem('udacity-final-project-token');
                console.info(lst);
                // console.info('lst: ', lst);
            }
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

async function getUser(username, password){
    let user;
    let error;
    const response = await API._getUsers();
    if (!response || response === null){
        error = {
            type: LOGIN_FAILURE,
            error: 'Did not find any users'
        };
    }
    try {
        user = response[username];
    } catch(e){}
    if (!user || user === null){
        error = {
            type: LOGIN_FAILURE,
            error: 'Did not find user matching this username'
        };
    }
    else {
        //  Check if the password matches
        if (user.password !== password){
            error = {
                type: LOGIN_FAILURE,
                error: 'Password did not match'
            };
        }
    }
    return {
        user,
        getUserError: error
    };
}

export function refreshUser(uId){
    return async (dispatch) => {
        console.log('Refreshing User ...');
        const response = await API._getUsers();
        let user;
        if (response && response !== null){
            user = response[uId];
            dispatch({
                type: LOGIN_SUCCESS,
                user
            });
            console.log('Refreshed.');
            return true;
        }
    }
}

export function attemptSessionRestore(){

    return async (dispatch) => {
        //  Check if the user has a logged in cookie
        let validSession = false;
        const sessionToken = localStorage.getItem('udacity-final-project-token');
        if (sessionToken && sessionToken !== null){
            console.log('There is a valid session token', sessionToken);
            let decodedToken = await fetch('/api/auth/decode-jwt', {
                body: JSON.stringify({
                    token: sessionToken
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (decodedToken.ok){
                decodedToken = await decodedToken.json();
                //  With the decodedToken the following are now available: username, password, iat, exp
                //  Get the user, set the state in the store, redirect to / if on /login
                console.log('decodedToken', decodedToken);
                const {user, getUserError} = await getUser(decodedToken.username, decodedToken.password);
                if (getUserError && getUserError !== null){
                    dispatch(getUserError);
                    return validSession;
                }
                dispatch({
                    type: LOGIN_SUCCESS,
                    user
                });
                dispatch({
                    type: ATTEMPT_RESTORE
                });
                validSession = true;
            }
        }

        return validSession;

        // dispatch({
        //     type: SESSION_RESTORE
        // })
    }

}