import { SET_LOADING_START, SET_LOADING_END } from "../reducers/loading";

export function setLoadingStart(){
    return async (dispatch) => {
        console.log('Toggle Loading - Start');
        dispatch({
            type: SET_LOADING_START
        });
    }
}

export function setLoadingEnd(){
    return async (dispatch) => {
        console.log('Toggle Loading - End');
        dispatch({
            type: SET_LOADING_END
        });
    }
}