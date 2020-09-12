import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table } from 'reactstrap';

import { fetch_sales_by_date } from '../Redux/ActionCreators'; 

function Statistics() {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const sales = useSelector(state => state.sales_stats);
    
    useEffect(() => {
        dispatch(fetch_sales_by_date(day, month, year));
    }, [date])
    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

    const renderSalesList = sales.stats.map(sale => (
        <tr key={sale._id}>
            <th scope='row'>{sale.name}</th>
            <th>{sale.count}</th>
            <th>{sale.rate_sold}</th>
            <th>profit</th>
        </tr>
    ))
    
    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date} onChange={date => {setDate(date)}} />
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
                            <th>Item</th>
                            <th>Count</th>
                            <th>Rate</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSalesList}
                        <tr>
                            <th>Total Sales : {sales.stats.length}</th>
                            <th>Total Profit : N/A</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Statistics;