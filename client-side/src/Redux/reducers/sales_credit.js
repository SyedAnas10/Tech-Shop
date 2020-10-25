import * as ActionTypes from '../ActionTypes';

export const Sales_Credit = (state = {
    isLoading: true,
    sales_credit: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.SALES_CREDIT_LOADING:
            return {
                ...state,
                isLoading: true,
                sales_credit: [],
                errMess: null
            };

        case ActionTypes.ADD_SALES_CREDIT:
            return {
                ...state,
                isLoading: false,
                sales_credit: action.payload,
                errMess: null
            };

        case ActionTypes.SALES_CREDIT_FAILED:
            return {
                ...state,
                isLoading: false,
                sales_credit: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}