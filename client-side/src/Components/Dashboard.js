import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, NavLink, Row } from 'reactstrap';

import { fetch_items, 
        fetch_pc_making, 
        fetch_pc_making_by_date, 
        fetch_pc_repairing, 
        fetch_pc_repair_by_date, 
        fetch_sales_by_date,
        fetch_purchases_by_date, 
        fetch_sales_credit,
        fetch_purchasing_credit,
        fetch_users,
        authenticate,
        post_users,
        edit_user } from '../Redux/ActionCreators';

let items_fetch = false
let makeOrders_fetch = false
let repairOrders_fetch = false
let sales_by_date_fetch = false;
let make_by_date_fetch = false;
let repair_by_date_fetch = false;
let purchases_by_date_fetch = false;
let scredit_fetch = false;
let pcredit_fetch = false;
let users_fetch = false;

function Dashboard() {

    const dispatch = useDispatch();
    const date = new Date()
    const date_string = date.toString()
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);
    const products = useSelector(state => state.items)
    const lowStocked = products.items.filter(product => product.count <= 10)
    const makeOrders = useSelector(state => state.pc_making)
    const repairOrders = useSelector(state => state.pc_repairing)
    const Sales = useSelector(state => state.sales_stats)
    const Repair = useSelector(state => state.pc_repair_stats)
    const Make = useSelector(state => state.pc_make_stats)
    const Purchases = useSelector(state => state.purchases)
    const saleCredit = useSelector(state => state.sales_credit)
    const purchaseCredit = useSelector(state => state.purchasing_credit)
    const users = useSelector(state => state.users);
    const authentication = useSelector(state => state.authentication_status);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [modal, setModal] = useState(false);
    const [changeCredentialsModal, setChangeCredentialsModal] = useState(false);
    const toggle = () => setChangeCredentialsModal(!changeCredentialsModal);

    const Center = {
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!items_fetch) {
            dispatch(fetch_items());
            items_fetch = true;
        }

        if(!makeOrders_fetch) {
            dispatch(fetch_pc_making());
            makeOrders_fetch = true;
        }

        if(!repairOrders_fetch) {
            dispatch(fetch_pc_repairing());
            repairOrders_fetch = true;
        }

        if(!sales_by_date_fetch) {
            dispatch(fetch_sales_by_date(day,month,year))
            
            sales_by_date_fetch = true;
        }

        if(!repair_by_date_fetch) {
            dispatch(fetch_pc_repair_by_date(day,month,year))

            repair_by_date_fetch = true;
        }

        if(!make_by_date_fetch) {
            dispatch(fetch_pc_making_by_date(day,month,year))

            make_by_date_fetch = true;
        }

        if(!purchases_by_date_fetch) {
            dispatch(fetch_purchases_by_date(day, month, year));

            purchases_by_date_fetch = true;
        }

        if(!scredit_fetch) {
            dispatch(fetch_sales_credit());

            scredit_fetch = true;
        }

        if(!pcredit_fetch) {
            dispatch(fetch_purchasing_credit());

            pcredit_fetch = true;
        }

        if(!users_fetch) {
            dispatch(fetch_users());

            users_fetch = true;
        }
    }, [products.items,
        makeOrders.pc_making,
        repairOrders.pc_repairing,
        Sales.stats,
        Repair.stats,
        Make.stats,
        Purchases.purchases,
        purchaseCredit.purchasing_credit,
        saleCredit.sales_credit,
        authentication.authenticated
    ]);

    const filtered_repair_orders = repairOrders.pc_repairing.filter(order => order.completed === false);
    const filtered_make_orders = makeOrders.pc_making.filter(order => order.completed === false);
    const filtered_purchasing_credits = purchaseCredit.purchasing_credit.filter(purchasing_credit => purchasing_credit.payed === false);
    const filtered_sales_credits = saleCredit.sales_credit.filter(sales_credit => sales_credit.payed === false);

    const get_sales_cash_in = () => {
        let sales_cash_in = 0;

        Sales.stats.forEach(stat => {
            sales_cash_in += stat.rate_sold;        
        });

        return sales_cash_in;
    }

    const get_pc_make_cash_in = () => {
        let pc_make_cash_in = 0;

        Make.stats.forEach(stat => {
            pc_make_cash_in += stat.specs_retail;        
        });

        return pc_make_cash_in;
    }

    const get_pc_repair_cash_in = () => {
        let pc_repair_cash_in = 0;

        Repair.stats.forEach(stat => {
            pc_repair_cash_in += stat.retail_cost;        
        });

        return pc_repair_cash_in;
    }

    const get_purchases_cash_out = () => {
        let purchases_cash_out = 0;

        Purchases.purchases.forEach(stat => {
            purchases_cash_out += stat.total_cost;        
        });

        return purchases_cash_out;
    }

    const get_pc_make_cash_out = () => {
        let pc_make_cash_out = 0;

        Make.stats.forEach(stat => {
            pc_make_cash_out += stat.specs_cost;        
        });

        return pc_make_cash_out;
    }

    const get_pc_repair_cash_out = () => {
        let pc_repair_cash_out = 0;

        Repair.stats.forEach(stat => {
            pc_repair_cash_out += stat.repair_cost;        
        });

        return pc_repair_cash_out;
    }

    const checkLogin = () => {
        if(userName === 'admin' && password === '1234')
            dispatch(authenticate(true));

        else 
            if(users.users.filter(user => user.username === userName && user.password === password).length)
                dispatch(authenticate(true));
            else {
                dispatch(authenticate(false));
                setModal(true);
                alert('Wrong username or password');
            }
                
    }

    const logout = () => {
        dispatch(authenticate(false));
        setModal(true);
    }

{/* FUNCTIONS TO RENDER COUNTS */}
    function itemsCount() {
        return(
            <Card body inverse color= {lowStocked.length === 0 ? 'success':'danger'} >
                <CardHeader tag='h2'>{lowStocked.length}</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Items</CardText>
                    <CardTitle>in your inventory are low in stock.</CardTitle>
                </CardBody>
            </Card>
        )
    }
    function repairCount() {
        return(
            <Card body inverse color= {filtered_repair_orders.length === 0 ? 'success' : 'danger'} >
                <CardHeader tag='h2'>{filtered_repair_orders.length}</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Orders</CardText>
                    <CardTitle>in your PC Repair list.</CardTitle>
                </CardBody>
            </Card>
        )
    }
    function makeCount() {
        return(
            <Card body inverse color= {filtered_make_orders.length === 0 ? 'success' : 'danger'} >
                <CardHeader tag='h2'>{filtered_make_orders.length}</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Orders</CardText>
                    <CardTitle>in your PC Making list.</CardTitle>
                </CardBody>
            </Card>
        )
    }
    function creditSale() {
        return (
            <Card body inverse color= {filtered_sales_credits.length === 0 ? 'success':'danger'} className='text-right'>
                <CardHeader tag='h2'>{filtered_sales_credits.length}</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Credit Sales</CardText>
                    <CardTitle>pending to be collected.</CardTitle>
                </CardBody>
            </Card>
        )
    }
    function creditPurchase() {
        return (
            <Card body inverse color= {filtered_purchasing_credits.length === 0 ? 'success':'danger'} className='text-left'>
                <CardHeader tag='h2'>{filtered_purchasing_credits.length}</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Credit Purchases</CardText>
                    <CardTitle>pending to be cleared.</CardTitle>
                </CardBody>
            </Card>
        )
    }
    function cashIn() {
        return (
            <Card className='text-right'>
                <CardHeader tag='h3'>Today's Cash In</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Inventory Cash In</CardText>
                    <CardTitle> Rs. {get_sales_cash_in()} </CardTitle>
                    <CardText tag='h4'>Repairing Cash In</CardText>
                    <CardTitle> Rs. {get_pc_repair_cash_in()} </CardTitle>
                    <CardText tag='h4'>PC-Make Cash In</CardText>
                    <CardTitle> Rs. {get_pc_make_cash_in()} </CardTitle>
                </CardBody>
                <CardFooter className='text-muted'>{date.toLocaleDateString()}</CardFooter>
            </Card>
        )
    }
    function cashOut() {
        return (
            <Card className='text-left'>
                <CardHeader tag='h3'>Today's Cash Out</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Purchase Expenses</CardText>
                    <CardTitle> Rs. {get_purchases_cash_out()} </CardTitle>
                    <CardText tag='h4'>Repairing Expenses</CardText>
                    <CardTitle> Rs. {get_pc_repair_cash_out()} </CardTitle>
                    <CardText tag='h4'>PC-Make Expenses</CardText>
                    <CardTitle> Rs. {get_pc_make_cash_out()} </CardTitle>
                </CardBody>
                <CardFooter className='text-muted'>{date.toLocaleDateString()}</CardFooter>
            </Card>
        )
    }

    function loginModal() {
        if(!authentication.authenticated) {
            return (
                <Modal isOpen={authentication.authenticated === false}>
                    <ModalHeader>Login to your account</ModalHeader>
                    <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={3}>Username : </Label>
                            <Col>
                                <Input onChange={e => setUserName(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Password : </Label>
                            <Col>
                                <Input type='password' onChange={e => setPassword(e.target.value)}/>
                            </Col>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={checkLogin}>Login</Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }

    const deal_credentials = () => {
        if(!users.users.length)
            dispatch(post_users(newUserName, newPassword));
        
        else
            dispatch(edit_user(newUserName, newPassword, users.users[0]._id));

        dispatch(authenticate(false));
        toggle()
        dispatch(fetch_users());
        setChangeCredentialsModal(false);
    }

    function changeCredential() {
        if(changeCredentialsModal) {
            return (
                <Modal isOpen={changeCredentialsModal} toggle={toggle} backdrop={true}>
                    <ModalHeader>Change Username and Password</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                            <Label sm={4}>Username : </Label>
                                <Col>
                                    <Input onChange={e => setNewUserName(e.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>New Password : </Label>
                                <Col>
                                    <Input type='password' onChange={e => setNewPassword(e.target.value)}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={() => deal_credentials()}>Save</Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }

    return (
        <div style={Center}> 
        {loginModal()}
        {changeCredential()}
        <Row>
            <Col sm='4'>
                {itemsCount()}
            </Col>
            <Col sm='4'>
                {repairCount()}
            </Col>
            <Col sm='4'>
                {makeCount()}
            </Col>
        </Row>
        <br></br>
        <Row>
            <Col sm='6'>
                {creditSale()}
            </Col>
            <Col sm='6'>
                {creditPurchase()}
            </Col>
        </Row>
        <br></br>
        <Row>
            <Col sm='6'>
                {cashIn()}
            </Col>
            <Col sm='6'>
                {cashOut()}
            </Col>
        </Row>
        <br></br>
        <Row>
            <Col sm={11} className='text-right'>
                <NavLink href='#' style={{color:'rgb(48,201,42)'}} onClick={() => setChangeCredentialsModal(true)}>
                    Change credentials?
                </NavLink>
            </Col>
            <Col sm={1} className='text-left'>
                <NavLink href='#' style={{color:'rgb(48,201,42)'}} onClick={() => logout()}>
                    Logout
                </NavLink>
            </Col>
        </Row>
        </div>
    )
}

export default Dashboard;