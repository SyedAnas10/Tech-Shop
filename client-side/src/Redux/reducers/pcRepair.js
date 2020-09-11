import * as ActionTypes from '../ActionTypes';

export const PC_Repairing = (state = {
    isLoading: true,
    pc_repairing: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PC_REPAIRING_LOADING:
            return {
                ...state,
                isLoading: true,
                pc_repairing: [],
                errMess: null
            };

        case ActionTypes.ADD_PC_REPAIRING: {
            return {
                ...state,
                isLoading: false,
                pc_repairing: action.payload,
                errMess: null
            };
        }

        case ActionTypes.PC_REPAIRING_FAILED:
            return {
                ...state,
                isLoading: false,
                pc_repairing: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}