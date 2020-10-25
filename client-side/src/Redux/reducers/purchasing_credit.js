import * as ActionTypes from '../ActionTypes';

export const Purchasing_Credit = (state = {
    isLoading: true,
    purchasing_credit: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PURCHASES_CREDIT_LOADING:
            return {
                ...state,
                isLoading: true,
                purchasing_credit: [],
                errMess: null
            };

        case ActionTypes.ADD_PURCHASES_CREDIT:
            return {
                ...state,
                isLoading: false,
                purchasing_credit: action.payload,
                errMess: null
            };

        case ActionTypes.PURCHASES_CREDIT_FAILED:
            return {
                ...state,
                isLoading: false,
                purchasing_credit: [],
                errMess: action.payload
            };

        default:
            return state;
    }
};