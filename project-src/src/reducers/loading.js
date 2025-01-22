export const SET_LOADING_START = 'SET_LOADING_START';
export const SET_LOADING_END = 'SET_LOADING_END';

export function loading(state = false, action){
    switch(action.type){
        case SET_LOADING_START:
            return true;
        case SET_LOADING_END:
            return false;
        default: 
            return state;
    }
}