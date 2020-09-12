import * as ActionTypes from '../ActionTypes';

export const Sales_Stats = (state = {
    isLoading: true,
    stats: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.SALES_STATS_LOADING:
            return state;

        case ActionTypes.ADD_SALES_STATS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload,
                errMess: null
            };

        case ActionTypes.SALES_STATS_FAILED:
            return {
                ...state,
                isLoading: false, 
                stats: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}