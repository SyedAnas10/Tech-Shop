import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Items } from './reducers/items';
import { PC_Making } from './reducers/pc_making';
import { PC_Repairing } from './reducers/pcRepair';

export const configureStore = () => {
    const store = createStore(combineReducers({
        items: Items,
        pc_making: PC_Making,
        pc_repairing: PC_Repairing
    }), applyMiddleware(thunk));

    return store;
}