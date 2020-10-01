import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';

import { fetch_items, fetch_pc_making, fetch_pc_making_by_date, fetch_pc_repairing, fetch_pc_repair_by_date, fetch_sales_by_date } from '../Redux/ActionCreators';

let items_fetch = false
let makeOrders_fetch = false
let repairOrders_fetch = false

let totalSalesProfit = 0;
let totalRepairProfit = 0;
let totalMakeProfit = 0;

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

        dispatch(fetch_sales_by_date(day,month,year))
        totalSalesProfit = 0
        Sales.stats.forEach(stat => {
            totalSalesProfit += stat.profit
        })

        dispatch(fetch_pc_repair_by_date(day,month,year))
        totalRepairProfit = 0
        Repair.stats.forEach(stat => {
            totalRepairProfit += stat.profit
        })

        dispatch(fetch_pc_making_by_date(day,month,year))
        totalMakeProfit = 0
        Make.stats.forEach(stat => {
            totalMakeProfit += stat.profit
        })
    }, [products.items,
        makeOrders.pc_making,
        repairOrders.pc_repairing,
        Sales.stats,
        Repair.stats,
        Make.stats]);

    const filtered_repair_orders = repairOrders.pc_repairing.filter(order => order.completed === false);
    const filtered_make_orders = makeOrders.pc_making.filter(order => order.completed === false);

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
                    <CardText tag='h4'>Sales Profit</CardText>
                    <CardTitle> {totalSalesProfit} </CardTitle>
                    <CardText tag='h4'>Repairing Profit</CardText>
                    <CardTitle> {totalRepairProfit} </CardTitle>
                    <CardText tag='h4'>PC-Make Profit</CardText>
                    <CardTitle> {totalMakeProfit} </CardTitle>
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
                    <CardTitle> {totalSalesProfit} </CardTitle>
                    <CardText tag='h4'>Repairing Expenses</CardText>
                    <CardTitle> {totalRepairProfit} </CardTitle>
                    <CardText tag='h4'>PC-Make Expenses</CardText>
                    <CardTitle> {totalMakeProfit} </CardTitle>
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