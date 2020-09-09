import * as ActionTypes from '../ActionTypes';

export const PC_Making = (state = {
    isLoading: true,
    pc_making: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PC_MAKING_LOADING:
            return {
                ...state,
                isLoading: true,
                pc_making: [],
                errMess: null
            };

        case ActionTypes.ADD_PC_MAKING:
            return {
                ...state,
                isLoading: false,
                pc_making: action.payload,
                errMess: null
            };

        case ActionTypes.PC_MAKING_FAILED:
            return {
                ...state,
                isLoading: false,
                pc_making: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}