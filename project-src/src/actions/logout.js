import * as API from '../../_DATA';

export const LOGOUT_USER = 'LOGOUT_USER';

export function attemptLogout(){
    return async (dispatch) => {
        localStorage.removeItem('udacity-final-project-token');
        console.log('Logged out');
        dispatch({
            type: LOGOUT_USER
        });
    }
}
