import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button } from 'reactstrap';

import { fetch_pc_repair_by_date } from '../../Redux/ActionCreators';

let total_profit = 0;

function PCRepairStats() {

    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const sales = useSelector(state => state.pc_repair_stats);
    const [showTotalProfit, setShowTotalProfit] = useState(false);
    useEffect(() => {
        dispatch(fetch_pc_repair_by_date(day, month, year))
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
            <th scope='row'>{sale.item}</th>
            <th>{sale.customer_name}</th>
            <th>{sale.repair_cost}</th>
            <th>{sale.retail_cost}</th>
            <th>{sale.retail_cost - sale.repair_cost}</th>
        </tr>
    ))

    const get_total_profit = () => {
        sales.stats.forEach(stat => {
            total_profit += (stat.retail_cost - stat.repair_cost);
        });
    }

    const show_total_profit = () => {
        get_total_profit();

        setShowTotalProfit(!showTotalProfit);
    }
    
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
                            <th>Customer</th>
                            <th>Cost</th>
                            <th>Rate</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSalesList}
                        <tr>
                            <th>Total Sales : {sales.stats.length}</th>
                            <th>{showTotalProfit ? 
                                <div>Total Profit : {total_profit}</div> 
                                : <Button onClick={() => show_total_profit()}>Show Total Profit</Button>}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PCRepairStats;