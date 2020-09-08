import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Items } from './reducers/items';

export const configureStore = () => {
    const store = createStore(combineReducers({
        items: Items
    }), applyMiddleware(thunk));

    return store;
}