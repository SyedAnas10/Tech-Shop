import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';

import { fetch_items, 
        fetch_pc_making, 
        fetch_pc_making_by_date, 
        fetch_pc_repairing, 
        fetch_pc_repair_by_date, 
        fetch_sales_by_date,
        fetch_purchases_by_date } from '../Redux/ActionCreators';

let items_fetch = false
let makeOrders_fetch = false
let repairOrders_fetch = false
let sales_by_date_fetch = false;
let make_by_date_fetch = false;
let repair_by_date_fetch = false;
let purchases_by_date_fetch = false;

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
    }, [products.items,
        makeOrders.pc_making,
        repairOrders.pc_repairing,
        Sales.stats,
        Repair.stats,
        Make.stats,
        Purchases.purchases]);

    const filtered_repair_orders = repairOrders.pc_repairing.filter(order => order.completed === false);
    const filtered_make_orders = makeOrders.pc_making.filter(order => order.completed === false);

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
    function cashIn() {
        return (
            <Card className='text-right'>
                <CardHeader tag='h3'>Today's Cash In</CardHeader>
                <CardBody>
                    <CardText tag='h4'>Inventory Cash In</CardText>
                    <CardTitle> {get_sales_cash_in()} </CardTitle>
                    <CardText tag='h4'>Repairing Cash In</CardText>
                    <CardTitle> {get_pc_repair_cash_in()} </CardTitle>
                    <CardText tag='h4'>PC-Make Cash In</CardText>
                    <CardTitle> {get_pc_make_cash_in()} </CardTitle>
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
                    <CardTitle> {get_purchases_cash_out()} </CardTitle>
                    <CardText tag='h4'>Repairing Expenses</CardText>
                    <CardTitle> {get_pc_repair_cash_out()} </CardTitle>
                    <CardText tag='h4'>PC-Make Expenses</CardText>
                    <CardTitle> {get_pc_make_cash_out()} </CardTitle>
                </CardBody>
                <CardFooter className='text-muted'>{date.toLocaleDateString()}</CardFooter>
            </Card>
        )
    }

    return (
        <div style={Center}> 
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
                {cashIn()}
            </Col>
            <Col sm='6'>
                {cashOut()}
            </Col>
        </Row>
        </div>
    )
}

export default Dashboard;