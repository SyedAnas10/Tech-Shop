import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button } from 'reactstrap';

import { fetch_items_by_date } from '../../Redux/ActionCreators';

let total_expenses = 0;

function PurchaseStats() {

    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const purchases = useSelector(state => state.items);
    const [showTotalExpenses, setShowTotalExpenses] = useState(false);
    useEffect(() => {
        dispatch(fetch_items_by_date(day, month, year));
        // alert(JSON.stringify(purchases.items))
    }, [date])
    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    const setDateAndResetExpenses = (date) => {
        total_expenses = 0;
        setShowTotalExpenses(!showTotalExpenses);
        setDate(date);
    }

    const get_total_expenses = () => {
        purchases.items.forEach(purchase => {
            total_expenses += (purchase.cost_price * purchase.count);
        });
    }

    const show_total_expenses = () => {
        get_total_expenses();

        setShowTotalExpenses(!showTotalExpenses);
    }

    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

    const renderPurchaseList = purchases.items.map(purchase => (
        <tr key={purchase._id}>
            <th scope='row'>{purchase.name}</th>
            <th>{purchase.model}</th>
            <th>{purchase.count}</th>
            <th>{purchase.cost_price * purchase.count}</th>
        </tr>
    ))
    
    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date} onChange={date => {setDateAndResetExpenses(date)}} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='date' sm={2}> 
                    </Label>
                </FormGroup>
            </Form>
            <div style={Center}>
                <Table responsive hover>
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Count</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPurchaseList}
                        <tr>
                            <th>Total Purchases : {purchases.items.length}</th>
                            <th>{showTotalExpenses ? 
                                <div>Total Expenses : {total_expenses}</div> 
                                : <Button onClick={() => show_total_expenses()}>Show Total Expenses</Button>}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PurchaseStats;