import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane, Input, Spinner } from 'reactstrap'
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
                    <Button outline color='success'><Badge color='success'pill>Rs. {order.specs_retail}</Badge></Button>
                    <Button className='mt-3' color='success' onClick={() => dispatch(pc_making_completed(order._id))}>Mark Completed</Button>
                </CardBody>
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