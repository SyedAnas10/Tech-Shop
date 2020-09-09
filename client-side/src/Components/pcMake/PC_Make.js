import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import AddWishList from './AddList'

import { fetch_pc_making } from '../../Redux/ActionCreators';

let fetch_called = false;

function MakeList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.pc_making)
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
            dispatch(fetch_pc_making());
            fetch_called = false;
        }
    }, [orders]);

    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    if(orders.isLoading) {
        return(
            <div>
                Loading
            </div>
        );
    }
    else {
        const renderList = orders.pc_making.map(order => (
            <Card body key={order._id}>
                <CardHeader>{order.customer_name}</CardHeader>
                <CardBody>
                    <CardText>
                        {order.specs_list.split(' ').map(item => (
                            <p>
                                {item}
                            </p>
                        ))}
                    </CardText>
                    <Button outline color='success'><Badge color='success'pill>Rs. {order.specs_retail}</Badge></Button>
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