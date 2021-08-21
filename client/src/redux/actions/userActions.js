import * as ActionTypes from '../constants/userConstants';

export const setCurrentUser = user =>{
    return{
        type: ActionTypes.SET_CURRENT_USER,
        payload: user
    }
} 