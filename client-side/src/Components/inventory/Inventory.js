import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Nav, NavItem, NavLink, TabContent, TabPane, Navbar, Badge, Button, Input } from 'reactstrap';
import AddItemForm from './AddItem';

import { fetch_items } from '../../Redux/ActionCreators';

let fetch_called = false;

function Inventory() {

// PRIVATE STATE
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const lowStocked = products.items.filter(product => product.count <= 10)
    const [activeTab, setActiveTab] = useState('1')
    const [enterNew, toggleEnter] = useState(false)
    const Center = {
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = !fetch_called;
        }
    }, [products.items])


// RENDER AND LOGIC FUNCTIONS     
    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    if(products.isLoading) {
        return(
            <div>
                Loading
            </div>
        );
    }
    else {
        const renderProduct = products.items.map(product => (
            <tr key={product._id}>
                <th scope="row">{product.name}</th>
                <th>{product.model}</th>
                <th>{product.count}</th>
                <th>{product.cost_price}</th>
                <th>{product.retail_price}</th>
                <th>{product.retail_price - product.cost_price}</th>
            </tr>
        ));

        const renderLowProduct = lowStocked.map(product => (
            <tr key={product._id}>
                <th scope="row">{product.name}</th>
                <th>{product.model}</th>
                <th>{product.count}</th>
                <th>{product.cost_price}</th>
                <th>{product.retail_price}</th>
                <th>{product.retail_price - product.cost_price}</th>
            </tr>
        ));

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
                                Low Stock List <Badge color='success'>{lowStocked.length}</Badge>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
    
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                    <Input type='text' id="myInput" placeholder="Search" autoComplete='off'/>
                        <div style={Center}>
                            <Table hover responsive>
                                <thead>
                                    <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                                        <th>Name</th>
                                        <th>Model</th>
                                        <th>Stock Pieces</th>
                                        <th>Cost</th>
                                        <th>Retail</th>
                                        <th>Approx. Profit</th>
                                        <th><Button color='dark' size='sm' onClick={() => {toggleEnter(!enterNew)}}>{enterNew?'Cancel':'Add new'}</Button></th>
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
                            <Table hover responsive>
                                <thead style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
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
}

export default Inventory;