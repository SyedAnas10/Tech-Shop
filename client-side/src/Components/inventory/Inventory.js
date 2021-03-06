import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Nav, NavItem, NavLink, TabContent, TabPane, Navbar, Badge, Button, Input, Spinner } from 'reactstrap';
import AddItemForm from './AddItem';

import { fetch_items, delete_item } from '../../Redux/ActionCreators';
import EditItemForm from './EditItem';

let fetch_called = false;

function Inventory() {

// PRIVATE STATE
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const [state_update, setStateUpdate] = useState(true);
    useEffect(() => {
        if(state_update) {
            fetch_called = false;
            setStateUpdate(false);
        }

        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
            filter(products.items);
        }
    }, [products.items])
    const lowStocked = products.items.filter(product => product.count <= 10)
    const [filtered, filter] = useState(products.items)
    useEffect(() => {
        filter(products.items);
    }, [products.items])
    const [editableItem, setEditItem] = useState()
    const [activeTab, setActiveTab] = useState('1')
    const [enterNew, toggleEnter] = useState(false)
    const Center = {
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const buttonStyle = {
        fontSize: '25px',
        marginLeft: '20px',
        color: 'red'
    }


// RENDER AND LOGIC FUNCTIONS     
    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

// HANDLE SEARCH-BAR LOGIC 
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        filter(products.items.filter(product => {
            return product.name.toLowerCase().indexOf(query) > -1 || product.model.toLowerCase().indexOf(query) > -1; 
        }))
    }

    if(products.isLoading) {
        return(
            <div style={Center}>
                <Spinner color="success" style={{ width: '3rem', height: '3rem' }} />
            </div>
        );
    }
    else {
        const renderProduct = filtered.map(product => (
            <tr key={product._id}>
                <th scope="row">{product.name}</th>
                <th>{product.model}</th>
                <th>{product.count}</th>
                <th>{product.retail_price}</th>
                <th>
                    <i className="fa fa-pencil" onClick={() => setEditItem(product)} style={{ fontSize: '25px', color: "rgb(48,201,42)"}}></i>
                    <i className="fa fa-trash-o" onClick={() => dispatch(delete_item(product._id))} style={buttonStyle}></i>
                </th>
            </tr>
        ));

        const renderLowProduct = lowStocked.map(product => (
            <tr key={product._id}>
                <th scope="row">{product.name}</th>
                <th>{product.model}</th>
                <th>{product.count}</th>
                <th>{product.cost_price}</th>
            </tr>
        ));


        return (
            <div>
                <Navbar>
                    <Nav tabs> 
                        <NavItem>
                            <NavLink href="#" className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                                All Items
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                                Low Stock List <Badge color='success'>{lowStocked.length}</Badge>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
    
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                    <Input type='text' placeholder="Search" autoComplete='off' onChange={(event) => handleSearch(event)}/>
                        <div style={Center}>
                            <Table hover responsive>
                                <thead>
                                    <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                                        <th>Name</th>
                                        <th>Model</th>
                                        <th>Stock Pieces</th>
                                        <th>Retail Price Per Piece</th>
                                        {!editableItem && <th></th>}
                                        {/*!editableItem && <th><Button color='dark' size='sm' onClick={() => {toggleEnter(!enterNew)}}>{enterNew?'Cancel':'Add new'}</Button></th>*/}
                                        {editableItem && <th><Button color='dark' size='sm' onClick={() => {setEditItem()}}>Close</Button></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {editableItem && <EditItemForm item={editableItem}/> }
                                    {enterNew && <AddItemForm  />}
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