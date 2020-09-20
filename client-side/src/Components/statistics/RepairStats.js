import React, { useEffect } from'react'
import { useDispatch, useSelector } from 'react-redux'

function RepairStats() {

    const dispatch = useDispatch()
    const [date, setDate] = useSelector()
    const repairs = useSelector(state => state.sales_stats)
    useEffect(() => {
        dispatch()
    }, [date])

    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

    
}