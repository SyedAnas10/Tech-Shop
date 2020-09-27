import * as ActionTypes from '../ActionTypes';

export const Purchases = (state = {
    isLoading: true,
    purchases: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PURCHASES_STATS_LOADING:
            return state;
        
        case ActionTypes.ADD_PURCHASES_STATS:
            return {
                ...state,
                isLoading: false,
                purchases: action.payload,
                errMess: null
            };

        case ActionTypes.PURCHASES_STATS_FAILED:
            return {
                ...state,
                isLoading: true,
                purchases: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}