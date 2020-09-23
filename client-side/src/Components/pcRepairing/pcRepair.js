import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane, Input } from 'reactstrap'
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
        const query = event.target.value.toLowerCase();
        filter(orders.pc_repairing.filter(order => {
            return order.customer_name.toLowerCase().indexOf(query) > -1
        }))
    }
    const filtered_orders = orders.pc_repairing.filter(pc_repair => pc_repair.completed !== true);

    function noOrder() {
        if(filtered_orders.length === 0 ) {
            return (
                <div style={Center}>
                    No orders currently.
                </div>
            )
        }
        else {
            return null;
        }
    }

    if(orders.isLoading) {
        return(
            <div>
                Loading
            </div>
        );
    }
    else {
        const renderList = filtered_orders.map(order => (
            <div>
                {
                    !order.completed ?

                    <Card body key={order._id}>
                        <CardHeader>{order.customer_name}</CardHeader>
                        <CardBody>
                            <CardText>
                                
                            </CardText>
                            <Button outline color='success'><Badge color='success'pill>Rs. {order.retail_cost}</Badge></Button>
                            <Button className='ml-3' color='success' onClick={() => dispatch(repairing_completed(order._id))}>Mark Completed</Button>
                        </CardBody>
                    </Card> :

                    <div>
                    </div>
                }
            </div>
        ))

        return(
            <div>
                <Navbar>
                    <Nav tabs> 
                        <NavItem>
                        <NavLink className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                                All Orders
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                                Add Order
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
    
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                        <Input type='text' placeholder="Search" autoComplete='off' onChange={(event) => handleSearch(event)}/>
                        {noOrder()}
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