import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane, Input, Spinner, Alert } from 'reactstrap'
import AddWishList from './AddList'

import { fetch_pc_making, pc_making_completed } from '../../Redux/ActionCreators';

let fetch_called = false;

function MakeList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.pc_making)
    const [filtered, filter] = useState(orders.pc_making)
    useEffect(()=>{
        filter(orders.pc_making)
    }, [orders.pc_making])
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
            dispatch(fetch_pc_making());
            fetch_called = true;
        }
    }, [orders]);

    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        filter(orders.pc_making.filter(order => {
            return order.customer_name.toLowerCase().indexOf(query) > -1
        }))
    }
    const filtered_orders = filtered.filter(pc_make => pc_make.completed !== true);

    function noOrder() {
        const uncomplete = orders.pc_making.filter(order => {
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
        dispatch(pc_making_completed(order._id))
        
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
                <CardHeader>{order.customer_name}</CardHeader>
                <CardBody>
                    <CardText>
                        {order.specs_list}
                    </CardText>
                    <b>Specs Cost : </b> Rs. {order.specs_cost} <br />
                    <b>Retail Price : </b> Rs. {order.specs_retail} <br />
                    <b>Advance Payment : </b> Rs. {order.advance_payment}
                </CardBody>
                <Button className='mt-3' color='success' onClick={() => completeOrder(order)}>Mark Completed</Button>
                
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
                        <AddWishList/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

export default MakeList;