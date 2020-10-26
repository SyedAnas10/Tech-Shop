import * as ActionTypes from '../ActionTypes';

export const Authentication_Status = (state = {
    authenticated: false
}, action) => {
    switch(action.type) {
        case ActionTypes.AUTHENTICATION_STATUS_CHANGED: 
            return {
                ...state,
                authenticated: action.payload
            };

        default:
            return state;
    }
};