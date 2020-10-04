import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane, Input, Spinner, CardFooter, Alert } from 'reactstrap'
import AddWishListUtil from './AddlistUtil'

import { fetch_pc_repairing, repairing_completed } from '../../Redux/ActionCreators';

let fetch_called = false;

function RepairList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.pc_repairing)
    const [filtered, filter] = useState(orders.pc_repairing)
    useEffect(()=> {
        filter(orders.pc_repairing)
    }, [orders.pc_repairing])
    const [activeTab, setActiveTab] = useState('1')
    const [showToast,toggleToast] = useState(false)

    const Center = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
    const CardBox = {
        maxWidth: '300px',  
        border: '0.5px solid lightgray',
        margin: '10px',
        textAlign: 'center'
    }
    const LoadCenter = {
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_pc_repairing());
            fetch_called = true;
        }
    }, [orders]);

    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    const handleSearch = (event) => {
        const query = event.target.value;
        filter(orders.pc_repairing.filter(order => {
            return order.customer_name.toLowerCase().indexOf(query) > -1 || order.serial_no == query
        }))
    }
    const filtered_orders = filtered.filter(pc_repair => pc_repair.completed !== true);

    function noOrder() {
        const uncomplete = orders.pc_repairing.filter(order => {
            return order.completed === false
        })
        if(uncomplete.length === 0 ) {
            return (
                <div style={Center}>
                    No pending orders currently.
                </div>
            )
        }
        else {
            return null;
        }
    }

    function completeOrder(order) {
        dispatch(repairing_completed(order._id))
        dispatch(fetch_pc_repairing())        
        toggleToast(true);
        window.setTimeout(() => {
            toggleToast(false)
        },3000)
    }

    if(orders.isLoading) {
        return(
            <div style={LoadCenter}>
                <Spinner color="success" style={{ width: '3rem', height: '3rem' }} />
            </div>
        );
    }
    else {
        const renderList = filtered_orders.map(order => (
            <Card body key={order._id} style={CardBox}>
                <CardHeader>{order.item} - {order.customer_name}</CardHeader>
                <CardBody>
                    <CardText>
                        {order.details}
                    </CardText>
                    <b>Serial Number : </b> {order.serial_no}<br />
                    <b>Contact : </b> {order.contact_number}<br />
                    <b>Retail : </b> Rs. {order.retail_cost}
                </CardBody>
                <CardFooter>
                    <Button className='mt-3' color='success' onClick={() => completeOrder(order)}>Mark Completed</Button>
                </CardFooter>
            </Card> 
        ))

        return(
            <div>
                <Navbar>
                    <Nav tabs> 
                        <NavItem>
                            <NavLink href="#" className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                                All Orders
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                                Add Order
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
    
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                        <Input type='text' placeholder="Search" autoComplete='off' onChange={(event) => handleSearch(event)}/>
                        {noOrder()}
                        <Alert color='success' isOpen={showToast}>
                            Order Completed!
                        </Alert>
                        <div style={Center}>
                            {renderList}
                        </div>
                    </TabPane>
                    <TabPane tabId='2'>
                        <AddWishListUtil/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

export default RepairList;