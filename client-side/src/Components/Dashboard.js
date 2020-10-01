import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetch_items, fetch_pc_making, fetch_pc_repairing } from '../Redux/ActionCreators';

let items_fetch = false
let makeOrders_fetch = false
let repairOrders_fetch = false

function Dashboard() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const lowStocked = products.items.filter(product => product.count <= 10)
    const makeOrders = useSelector(state => state.pc_making)
    const repairOrders = useSelector(state => state.pc_repairing)
    const Center = {
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!items_fetch) {
            dispatch(fetch_items());
            items_fetch = true;
        }
    }, [products.items])
    useEffect(() => {
        if(!makeOrders_fetch) {
            dispatch(fetch_pc_making());
            makeOrders_fetch = true;
        }
    }, [makeOrders.pc_making])
    useEffect(() => {
        if(!repairOrders_fetch) {
            dispatch(fetch_pc_repairing());
            repairOrders_fetch = true;
        }
    }, [repairOrders.pc_repairing])


{/* FUNCTIONS TO RENDER COUNTS */}
    function itemsCount() {
        if(lowStocked.length > 0) {
           return  <p>{ lowStocked.length } items low in stock.</p> 
        }
        else {
            return <p>Currently no item low in stock.</p> 
        }
    }
    function repairCount() {
        if(repairOrders.pc_repairing.length > 0) {
            return <p>{ repairOrders.pc_repairing.length } pending orders.</p>
        }
        else {
            return <p>No pending orders.</p>
        }
    }
    function makeCount() {
        if(makeOrders.pc_making.length > 0) {
            return <p>{ makeOrders.pc_making.length } pending orders.</p>
        }
        else {
            return <p>No pending orders.</p>
        }
    }

    return (
        <div style={Center}> 
            <h3>Low Stocked Items</h3>
            {itemsCount()}
            <h3>Repairing Orders</h3>
            {repairCount()}
            <h3>PC Orders</h3>
            {makeCount()}
        </div>
    )
}

export default Dashboard;