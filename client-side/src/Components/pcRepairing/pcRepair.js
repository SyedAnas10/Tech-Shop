import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import AddWishListUtil from './AddlistUtil'

import { fetch_pc_repairing } from '../../Redux/ActionCreators';

let fetch_called = false;

function RepairList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.pc_repairing)
    const [activeTab, setActiveTab] = useState('1')
    const Center = {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
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

    function noOrder() {
        if(orders.pc_repairing.length === 0 ) {
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
        const renderList = orders.pc_repairing.map(order => (
            <Card body key={order._id}>
                <CardHeader>{order.customer_name}</CardHeader>
                <CardBody>
                    <CardText>
                        
                    </CardText>
                    <Button outline color='success'><Badge color='success'pill>Rs. {order.retail_cost}</Badge></Button>
                </CardBody>
            </Card>
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