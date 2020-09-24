import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button } from 'reactstrap';

import { fetch_pc_making_by_date } from '../../Redux/ActionCreators';

let total_profit = 0;

function PCMakingStats() {

    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const sales = useSelector(state => state.pc_make_stats);
    const [showTotalProfit, setShowTotalProfit] = useState(false);
    useEffect(() => {
        dispatch(fetch_pc_making_by_date(day, month, year))
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
            <th scope='row'>{sale.customer_name}</th>
            <th>{sale.specs_cost}</th>
            <th>{sale.specs_retail}</th>
            <th>{sale.specs_retail - sale.specs_cost}</th>
        </tr>
    ))

    const setDateAndResetProfit = (date) => {
        total_profit = 0;
        setShowTotalProfit(false);
        setDate(date);
    }

    const get_total_profit = () => {
        sales.stats.forEach(stat => {
            total_profit += (stat.specs_retail - stat.specs_cost);
        });
    }

    const show_total_profit = () => {
        get_total_profit();

        setShowTotalProfit(true);
    }
    
    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date} onChange={date => {setDateAndResetProfit(date)}} />
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

export default PCMakingStats;