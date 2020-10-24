import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_purchasing_credit } from '../../Redux/ActionCreators';

let fetch_called = false;

function PurchaseCredit() {
    const dispatch = useDispatch();
    const purchasing_credit = useSelector(state => state.purchasing_credit);

    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_purchasing_credit());
            fetch_called = true;
        }
    }, [purchasing_credit]);

    if(purchasing_credit.isLoading) {
        return(
            <div>
                Loading
            </div>
        );
    }
    else {
        return (
            <div>
                {JSON.stringify(purchasing_credit.purchasing_credit)}
            </div>
        );
    }
}

export default PurchaseCredit