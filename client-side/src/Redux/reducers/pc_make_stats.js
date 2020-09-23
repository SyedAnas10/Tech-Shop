import * as ActionTypes from '../ActionTypes';

export const PC_Make_Stats = (state = {
    isLoading: true,
    stats: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PC_MAKE_STATS_LOADING:
            return state;

        case ActionTypes.ADD_PC_MAKE_STATS: {
            return {
                ...state,
                isLoading: false,
                stats: action.payload,
                errMess: null
            };
        }

        case ActionTypes.PC_MAKE_STATS_FAILED:
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