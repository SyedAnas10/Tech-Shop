import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../baseUrl';

export const add_items = (items) => {
    return {
        type: ActionTypes.ADD_ITEMS,
        payload: items
    };
}

export const items_loading = () => {
    return {
        type: ActionTypes.ITEMS_LOADING
    };
}

export const items_failed = (errMess) => {
    return {
        type: ActionTypes.ITEMS_FAILED,
        payload: errMess
    };
};

export const pc_making_loading = () => {
    return {
        type: ActionTypes.PC_MAKING_LOADING
    };
}

export const add_pc_making = (pc_making) => {
    return {
        type: ActionTypes.ADD_PC_MAKING,
        payload: pc_making
    };
}

export const pc_making_failed = (errMess) => {
    return {
        type: ActionTypes.PC_MAKING_FAILED,
        payload: errMess
    };
}

export const fetch_items = () => (dispatch) => {
    dispatch(items_loading());

    return fetch(baseUrl + 'items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(items => {
        dispatch(add_items(items))
    }, error => { throw error })
    .catch(error => {
        console.log(error.message);
        dispatch(items_failed(error.message));
    });
}

export const post_item = (name, model, count, cost_price, retail_price) => (dispatch) => {
    return fetch(baseUrl + 'items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            model: model,
            count: count,
            cost_price: cost_price,
            retail_price: retail_price
        })
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(response => {
        // alert(response);
        dispatch(fetch_items());
    }, error => { throw error; })
    .catch(error => alert(error.message));
}

export const fetch_pc_making = () => (dispatch) => {
    return fetch(baseUrl + 'pc_making')
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(pc_making => {
        // alert(JSON.stringify(pc_making));
        dispatch(add_pc_making(pc_making));
    }, error => { throw error; })
    .catch(error => {
        // alert(error);
        dispatch(pc_making_failed(error.message));
    });
}

export const post_pc_making = (name, specs, cost, retail, advance) => (dispatch) => {
    alert(name, specs, cost, retail, advance)
    return fetch(baseUrl + 'pc_making', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer_name: name,
            specs_list: specs,
            specs_cost: cost,
            specs_retail: retail,
            advance_payment: advance
        })
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, err => { throw err; })
    .then(response => response.json())
    .then(() => {
        dispatch(fetch_pc_making());
    }, err => { throw err; })
    .catch(err => alert(err));
}