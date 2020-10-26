import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Items } from './reducers/items';
import { PC_Making } from './reducers/pc_making';
import { PC_Repairing } from './reducers/pcRepair';
import { Sales_Stats } from './reducers/sales_stats';
import { PC_Make_Stats } from './reducers/pc_make_stats';
import { PC_Repair_Stats } from './reducers/pc_repair_stats';
import { Purchases } from './reducers/purchases';
import { Purchasing_Credit } from './reducers/purchasing_credit';
import { Sales_Credit } from './reducers/sales_credit';
import { Users } from './reducers/users';
import { Authentication_Status } from './reducers/authentication';

const persistConfig = {
    key: 'authentication_status',
    storage: storage,
    whitelist: ['authentication_status']
};

const pReducer = persistReducer(persistConfig, combineReducers({
    items: Items,
    pc_making: PC_Making,
    pc_repairing: PC_Repairing,
    sales_stats: Sales_Stats,
    pc_make_stats: PC_Make_Stats,
    pc_repair_stats: PC_Repair_Stats,
    purchases: Purchases,
    purchasing_credit: Purchasing_Credit,
    sales_credit: Sales_Credit,
    users: Users,
    authentication_status: Authentication_Status
}));


const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { persistor, store };
