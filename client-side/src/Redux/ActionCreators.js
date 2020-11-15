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
        dispatch(fetch_items());
    }, error => { throw error; })
    .catch(error => alert(error.message));
}
// PcMaking Actions
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
        dispatch(add_pc_making(pc_making));
    }, error => { throw error; })
    .catch(error => {
        dispatch(pc_making_failed(error.message));
    });
}
export const post_pc_making = (name, specs, cost, retail, advance) => (dispatch) => {
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

export const pc_repairing_loading = () => {
    return {
        type: ActionTypes.PC_REPAIRING_LOADING
    };
}

export const add_pc_repairing = (pc_repairing) => {
    return {
        type: ActionTypes.ADD_PC_REPAIRING,
        payload: pc_repairing
    };
}

export const pc_repairing_failed = (errMess) => {
    return {
        type: ActionTypes.PC_REPAIRING_FAILED,
        payload: errMess
    };
}


export const fetch_pc_repairing = () => (dispatch) => {
    dispatch(pc_repairing_loading());

    return fetch(baseUrl + 'repairing')
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(pc_repairing => {
        dispatch(add_pc_repairing(pc_repairing));
    }, error => { throw error; })
    .catch(error => {
        // alert(error);
        dispatch(pc_repairing_failed(error.message));
    });
}

export const post_pc_repairing = (item, s_no, name, contact, cost, retail, details) => (dispatch) => {
    return fetch(baseUrl + 'repairing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: item,
            serial_no: s_no,
            customer_name: name,
            contact_number: contact,
            repair_cost: cost,
            retail_cost: retail,
            details: details
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
    .then(() => dispatch(fetch_pc_repairing()))
    .catch(err => alert(err.message));
}

export const post_sales = (item, model, count, rate, profit) => (dispatch) => {

    return fetch(baseUrl + 'individual_items_sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: item,
            count: count,
            model: model,
            rate_sold: rate,
            profit: profit
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
    .then(() => alert('Sale Registered'))
    .catch(error => alert(error));
}

export const sales_stats_loading = () => {
    return {
        type: ActionTypes.SALES_STATS_LOADING
    };
}

export const add_sales_stats = (sales_stats) => {
    return {
        type: ActionTypes.ADD_SALES_STATS,
        payload: sales_stats
    };
}

export const sales_stats_failed = (errMess) => {
    return {
        type: ActionTypes.SALES_STATS_FAILED,
        payload: errMess
    };
}

export const fetch_sales_by_date = (day, month, year) => (dispatch) => {
    const query_string = '?day=' + day + '&month=' + month + '&year=' + year;
    return fetch(baseUrl + 'individual_items_sales' + query_string)
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_stats => {
        dispatch(add_sales_stats(sales_stats));
    }, error => { throw error; })
    .catch(error => {
        // alert(error.message);
        dispatch(sales_stats_failed(error.message));
    });
}

export const fetch_sales_by_month = (month, year) => (dispatch) => {
    const query_string = '?month=' + month + '&year=' + year;
    
    return fetch(baseUrl + 'individual_items_sales' + query_string)
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_stats => {
        dispatch(add_sales_stats(sales_stats));
    }, error => { throw error; })
    .catch(error => {
        alert(error.message);
        dispatch(sales_stats_failed(error.message));
    });
}

export const edit_item = (_id, name, count, model, cost, retail) => (dispatch) => {
    const query_string = '?_id=' + _id;

    return fetch(baseUrl + 'items' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            count: count, 
            model: model,
            cost_price: cost,
            retail_price: retail
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
    .then(() => dispatch(fetch_items()))
    .catch(err => {
        alert(err.message);
        dispatch(items_failed(err.message));
    });
}

export const delete_item = (_id) => (dispatch) => {
    const query_string = '?_id=' + _id;

    return fetch(baseUrl + 'items' + query_string, {
        method: 'DELETE',
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
    }, err => { throw err; })
    .then(response => response.json())
    .then(() => dispatch(fetch_items()))
    .catch(err => {
        alert(err.message);
        dispatch(items_failed(err.message));
    });
}

export const post_purchase = (name, model, count, cost) => (dispatch) => {
    return fetch(baseUrl + 'purchasing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_name: name,
            model: model,
            count: count,
            total_cost: cost
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
    .then(() => alert('Details added!'), err => { throw err; })
    .catch(err => alert(err.message));
}

export const decrease_item_count = (id, count) => (dispatch) => {
    const query_string = '?_id=' + id;
    return fetch(baseUrl + 'items' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            count: count
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
    .catch(err => alert(err.message));
}

export const repairing_completed = (_id) => (dispatch) => {
    const query_string = '?_id=' + _id;

    return fetch(baseUrl + 'repairing' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: true
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
    .then(dispatch(fetch_pc_repairing()))
    .catch(err => alert(err.message));
}

export const pc_making_completed = (_id) => (dispatch) => {
    const query_string = '?_id=' + _id;

    return fetch(baseUrl + 'pc_making' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: true
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
    .then(dispatch(fetch_pc_making()))
    .catch(err => alert(err.message));
}

export const fetch_pc_making_by_date = (day, month, year) => (dispatch) => {
    const query_string = '?day=' + day + '&month=' + month + '&year=' + year;
    return fetch(baseUrl + 'pc_making' + query_string)
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_stats => {
        dispatch(add_pc_make_stats(sales_stats));
    }, error => { throw error; })
    .catch(error => {
        // alert(error.message);
        dispatch(pc_make_stats_failed(error.message));
    });
}

export const pc_make_stats_loading = () => {
    return {
        type: ActionTypes.PC_MAKE_STATS_LOADING
    };
}

export const add_pc_make_stats = (pc_make_stats) => {
    return {
        type: ActionTypes.ADD_PC_MAKE_STATS,
        payload: pc_make_stats
    };
}

export const pc_make_stats_failed = (errMess) => {
    return {
        type: ActionTypes.PC_MAKE_STATS_FAILED,
        payload: errMess
    };
}

export const fetch_pc_repair_by_date = (day, month, year) => (dispatch) => {
    const query_string = '?day=' + day + '&month=' + month + '&year=' + year;
    return fetch(baseUrl + 'repairing' + query_string)
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_stats => {
        dispatch(add_pc_repair_stats(sales_stats));
    }, error => { throw error; })
    .catch(error => {
        // alert(error.message);
        dispatch(pc_repair_stats_failed(error.message));
    });
}

export const pc_repair_stats_loading = () => {
    return {
        type: ActionTypes.PC_REPAIR_STATS_LOADING
    };
}

export const add_pc_repair_stats = (pc_repair_stats) => {
    return {
        type: ActionTypes.ADD_PC_REPAIR_STATS,
        payload: pc_repair_stats
    };
}

export const pc_repair_stats_failed = (errMess) => {
    return {
        type: ActionTypes.PC_REPAIR_STATS_FAILED,
        payload: errMess
    };
}

export const fetch_purchases_by_date = (day, month, year) => (dispatch) => {
    const query_string = '?day=' + day + '&month=' + month + '&year=' + year;
    return fetch(baseUrl + 'purchasing' + query_string)
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_stats => {
        // alert(JSON.stringify(sales_stats))
        dispatch(add_purchases_stats(sales_stats));
    }, error => { throw error; })
    .catch(error => {
        // alert(error.message);
        dispatch(purchases_failed(error.message));
    });
}

export const purchases_loading = () => {
    return {
        type: ActionTypes.PURCHASES_STATS_LOADING
    };
};

export const add_purchases_stats = (purchases_stats) => {
    return {
        type: ActionTypes.ADD_PURCHASES_STATS,
        payload: purchases_stats
    };
};

export const purchases_failed = (errMess) => {
    return {
        type: ActionTypes.PURCHASES_STATS_FAILED,
        payload: errMess
    };
};

export const post_purchase_credit = (name, model, count, cost, customer_name, phone, date) => (dispatch) => {
    return fetch(baseUrl + 'purchasing_credit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_name: name,
            model: model,
            count: count,
            total_cost: cost,
            customer_name: customer_name,
            phone_no: phone,
            due_date: date
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
    .then(() => {
        
    }, error => { throw error; })
    .catch(error => alert(error.message));
}

export const post_sales_credit = (name, model, count, cost, customer_name, phone, date) => (dispatch) => {
    return fetch(baseUrl + 'sales_credit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_name: name,
            model: model,
            count: count,
            rate_sold: cost,
            customer_name: customer_name,
            phone_no: phone,
            due_date: date
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
    .then(() => {
        
    }, error => { throw error; })
    .catch(error => alert(error.message));
}

export const purchasing_credit_loading = () => {
    return {
        type: ActionTypes.PURCHASES_CREDIT_LOADING
    };
};

export const add_purchasing_credit = (purchasing_credit) => {
    return {
        type: ActionTypes.ADD_PURCHASES_CREDIT,
        payload: purchasing_credit
    };
};

export const purchasing_credit_failed = (errMess) => {
    return {
        type: ActionTypes.PURCHASES_CREDIT_FAILED,
        payload: errMess
    };
};

export const fetch_purchasing_credit = () => (dispatch) => {
    dispatch(purchasing_credit_loading());    

    return fetch(baseUrl + 'purchasing_credit')
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(purchasing_credit => {
        dispatch(add_purchasing_credit(purchasing_credit));
    }, err => { throw err; })
    .catch(err => dispatch(purchasing_credit_failed(err.message)));
};

export const sales_credit_loading = () => {
    return {
        type: ActionTypes.SALES_CREDIT_LOADING
    };
};

export const add_sales_credit = (sales_credit) => {
    return {
        type: ActionTypes.ADD_SALES_CREDIT,
        payload: sales_credit
    };
};

export const sales_credit_failed = (errMess) => {
    return {
        type: ActionTypes.SALES_CREDIT_FAILED,
        payload: errMess
    };
};

export const fetch_sales_credit = () => (dispatch) => {
    dispatch(sales_credit_loading());    

    return fetch(baseUrl + 'sales_credit')
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(sales_credit => {
        dispatch(add_sales_credit(sales_credit));
    }, err => { throw err; })
    .catch(err => dispatch(sales_credit_failed(err.message)));
};

export const edit_purchasing_credit = (id, payed) => (dispatch) => {
    const query_string = '?_id=' + id;

    return fetch(baseUrl + 'purchasing_credit' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            payed: payed
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
    .then(() => {
        
    }, err => { throw err; })
    .catch(err => alert(err.message));
}

export const edit_sales_credit = (id, payed) => (dispatch) => {
    const query_string = '?_id=' + id;

    return fetch(baseUrl + 'sales_credit' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            payed: payed
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
    .then(() => {
    }, err => { throw err; })
    .catch(err => alert(err.message));
}

export const users_loading = () => {
    return {
        type: ActionTypes.USERS_LOADING
    };
};

export const add_users = (users) => {
    return {
        type: ActionTypes.ADD_USERS,
        payload: users
    };
};

export const users_failed = (errMess) => {
    return {
        type: ActionTypes.USERS_FAILED,
        payload: errMess
    };
};

export const fetch_users = () => (dispatch) => {
    return fetch(baseUrl + 'users')
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(users => dispatch(add_users(users)))
    .catch(err => alert(err.message));
}

export const post_users = (username, password) => (dispatch) => {
    return fetch(baseUrl + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
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
    .then(() => alert('Credentials changed'))
    .catch(err => alert(err.message));
}

export const edit_user = (username, password, id) => (dispatch) => {
    const query_string = '?_id=' + id;
    return fetch(baseUrl + 'users' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
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
    .then(() => alert('Credentials changed'))
    .catch(err => alert(err.message));
}

export const authentication_status_changed = (status) => {

    return {
        type: ActionTypes.AUTHENTICATION_STATUS_CHANGED,
        payload: status
    };
};

export const authenticate = (status) => (dispatch) => {
    dispatch(authentication_status_changed(status));
}

export const edit_items_sales = (id, count, rate_sold, profit) => (dispatch) => {
    const query_string = '?_id=' + id;

    return fetch(baseUrl + 'individual_items_sales' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            count: count,
            rate_sold: rate_sold,
            profit: profit
        })
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(() => alert('Inventory updated'))
    .catch(error => alert(error.message));
}

export const delete_item_sales = (id) => (dispatch) => {
    const query_string = '?_id=' + id;

    return fetch(baseUrl + 'individual_items_sales' + query_string, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(() => alert('Inventory updated'))
    .catch(error => alert(error.message));
}

export const edit_purchase = (id, count, total_cost) => (dispatch) => {
    const query_string = '?_id=' + id;

    return fetch(baseUrl + 'purchasing' + query_string, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            count: count,
            total_cost: total_cost
        })
    })
    .then(response => {
        if(response.ok)
            return response;

        const error = new Error('Error ' + response.status + ': ' + response.statusText);
        throw error;
    }, error => { throw error; })
    .then(response => response.json())
    .then(() => alert('Inventory updated'))
    .catch(error => alert(error.message));
}