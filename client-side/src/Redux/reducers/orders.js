import * as ActionTypes from '../ActionTypes';

export const Orders = (state = {
    isLoading: true,
    orders: [],
    errMess: null
}, action) => {
    switch(action.payload) {
        case ActionTypes.ORDERS_LOADING:
            return state;

        case ActionTypes.ADD_ORDERS:
            return {
                ...state,
                isLoading: false,
                orders: action.payload,
                errMess: null
            };

        case ActionTypes.ORDERS_FAILED:
            return {
                ...state,
                isLoading: false,
                orders: [],
                errMess: action.payload
            };

        default:
            return state;
    }
}