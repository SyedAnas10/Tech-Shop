import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button, Navbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import AddWishList from './AddList'

function MakeList() {
    const orders = useSelector(state => state.makeList)
    const [activeTab, setActiveTab] = useState('1')
    const Center = {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    const renderList = orders.map(order => (
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

export default MakeList;