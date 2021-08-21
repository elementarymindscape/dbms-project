import * as ActionTypes from '../constants/userConstants';

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case ActionTypes.SET_CURRENT_USER: 
        return{
            ...state,
            currentUser: action.payload
        }
        default: return state;
    }
}