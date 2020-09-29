import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane, Input } from 'reactstrap'
import AddWishList from './AddList'

import { fetch_pc_making } from '../../Redux/ActionCreators';

let fetch_called = false;

function MakeList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.pc_making)
    const [filtered, filter] = useState(orders.pc_making)
    useEffect(()=>{
        filter(orders.pc_making)
    }, [orders.pc_making])
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

    function noOrder() {
        if(orders.pc_making.length === 0 ) {
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
        const renderList = filtered.map(order => (
            <Card body key={order._id} style={CardBox}>
                <CardHeader>{order.customer_name}</CardHeader>
                <CardBody>
                    <CardText>
                        {order.specs_list}
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
                    <Input type='text' placeholder="Search" autoComplete='off' onChange={(event) => handleSearch(event)}/>
                        {noOrder()}
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