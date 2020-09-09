import * as ActionTypes from '../ActionTypes';

export const Items = (state = {
    isLoading: true,
    items: [],
    errMess: null
}, action) =>  {
    switch(action.type) {
        case ActionTypes.ITEMS_LOADING: {
            return {
                ...state,
                isLoading: true,
                items: [],
                errMess: null
            };
        }

        case ActionTypes.ADD_ITEMS:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
                errMess: null
            };

        case ActionTypes.ITEMS_FAILED:
            return {
                ...state,
                isLoading: false,
                items: [],
                errMess: action.payload
            };

        default: 
            return state;
    }
}