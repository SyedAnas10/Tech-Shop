import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Items } from './reducers/items';
import { PC_Making } from './reducers/pc_making';
import { PC_Repairing } from './reducers/pcRepair';
import { Sales_Stats } from './reducers/sales_stats';
import { PC_Make_Stats } from './reducers/pc_make_stats';

export const configureStore = () => {
    const store = createStore(combineReducers({
        items: Items,
        pc_making: PC_Making,
        pc_repairing: PC_Repairing,
        sales_stats: Sales_Stats,
        pc_make_stats: PC_Make_Stats
    }), applyMiddleware(thunk));

    return store;
}