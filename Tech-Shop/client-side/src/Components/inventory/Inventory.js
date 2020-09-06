import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Nav, NavItem, NavLink, TabContent, TabPane, Navbar, Badge, Button, Input } from 'reactstrap';
import AddItemForm from './AddItem';

function Inventory() {

// PRIVATE STATE
    const products = useSelector(state => state.products)
    const lowStocked = products.filter(product => product.count <= 10)
    const [activeTab, setActiveTab] = useState('1')
    const [enterNew, toggleEnter] = useState(false)
    const Center = {
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }


// RENDER AND LOGIC FUNCTIONS     
    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    const renderProduct = products.map(product => (
        <tr key={product._id}>
            <th scope="row">{product.name}</th>
            <th>{product.model}</th>
            <th>{product.count}</th>
            <th>{product.cost_price}</th>
            <th>{product.retail_price}</th>
            <th>{product.retail_price - product.cost_price}</th>
        </tr>
    ))

    const renderLowProduct = lowStocked.map(product => (
        <tr key={product._id}>
            <th scope="row">{product.name}</th>
            <th>{product.model}</th>
            <th>{product.count}</th>
            <th>{product.cost_price}</th>
            <th>{product.retail_price}</th>
            <th>{product.retail_price - product.cost_price}</th>
        </tr>
    ))

    return (
        <div>
            <Navbar>
                <Nav tabs> 
                    <NavItem>
                        <NavLink className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                            All Items
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                            Low Stock List <Badge color='warning'>{lowStocked.length}</Badge>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                <Input type='text' id="myInput" placeholder="Search" autoComplete='off'/>
                    <div style={Center}>
                        <Table dark hover responsive id='myTable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Model</th>
                                    <th>Stock Pieces</th>
                                    <th>Cost</th>
                                    <th>Retail</th>
                                    <th>Approx. Profit</th>
                                    <th><Button color='warning' size='sm' onClick={() => {toggleEnter(!enterNew)}}>{enterNew?'Cancel':'Add new'}</Button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {enterNew && <AddItemForm/>}
                                {renderProduct}
                            </tbody>
                        </Table>
                    </div>
                </TabPane>
                <TabPane tabId='2'>
                    <div style={Center}>
                        <Table dark hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Model</th>
                                    <th>Stock Pieces</th>
                                    <th>Cost</th>
                                    <th>Retail</th>
                                    <th>Approx. Profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderLowProduct}
                            </tbody>
                        </Table>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Inventory;