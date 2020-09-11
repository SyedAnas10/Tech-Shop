import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Items } from './reducers/items';
import { PC_Making } from './reducers/pc_making';
import { Orders } from './reducers/orders';

export const configureStore = () => {
    const store = createStore(combineReducers({
        items: Items,
        pc_making: PC_Making,
        orders: Orders
    }), applyMiddleware(thunk));

    return store;
}