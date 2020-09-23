import * as ActionTypes from '../ActionTypes';

export const PC_Repair_Stats = (state = {
    isLoading: true,
    stats: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PC_REPAIR_STATS_LOADING:
            return state;

        case ActionTypes.ADD_PC_REPAIR_STATS: {
            return {
                ...state,
                isLoading: false,
                stats: action.payload,
                errMess: null
            };
        }

        case ActionTypes.PC_REPAIR_STATS_FAILED:
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