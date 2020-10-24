import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_sales_credit } from '../../Redux/ActionCreators';

let fetch_called = false;

function SalesCredit() {
    const dispatch = useDispatch();
    const sales_credit = useSelector(state => state.sales_credit);

    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_sales_credit());
            fetch_called = true;
        }
    }, [sales_credit])

    if(sales_credit.isLoading) {
        return (
            <div>
                Loading
            </div>
        );
    }
    else {
        return(
            <div>
                {JSON.stringify(sales_credit.sales_credit)}
            </div>
        )
    }
}

export default SalesCredit