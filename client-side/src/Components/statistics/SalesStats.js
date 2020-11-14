import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button, Input } from 'reactstrap';

import { fetch_sales_by_date } from '../../Redux/ActionCreators';

let total_profit = 0;   

function SalesStats() {

    const dispatch = useDispatch();
    const sales = useSelector(state => state.sales_stats);
    const [returnItem, setReturn] = useState(false);
    const [returningItem, setReturningItem] = useState();
    const [date, setDate] = useState(new Date())
    const [showTotalProfit, setShowTotalProfit] = useState(false);
    useEffect(() => {
        dispatch(fetch_sales_by_date(day, month, year));
        total_profit = 0;
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

    const get_total_profit = () => {
        sales.stats.forEach(stat => {
            total_profit += stat.profit
        });
    }

    const setDateAndResetProfit = (date) => {
        total_profit = 0;
        setShowTotalProfit(false);
        setDate(date);
    }

    const show_total_profit = () => {
        get_total_profit();

        setShowTotalProfit(true);
    }

    const renderReturnSale = () => {
        return(
        <div>
            <thead>
                <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                    <th>Item Name</th>
                    <th>Returning Count</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th><Input type='text' value={returningItem.name} disabled/></th>
                    <th><Input type='number' autoComplete='off' value={returningItem.count} /></th>
                    <th><Button color='dark' size='sm' style={{marginLeft:'5px'}} onClick={() => setReturn(false)}>Cancel</Button></th>
                    <th><Button color='warning' size='sm' style={{marginLeft:'5px'}} onClick={() => setReturn(false)}>Continue</Button></th>
                </tr>
            </tbody>
        </div>
        )
    }

    const renderSalesList = sales.stats.map(sale => (
        <tr key={sale._id}>
            <th scope='row'>{sale.name}</th>
            <th>{sale.model}</th>
            <th>{sale.count}</th>
            <th>{sale.rate_sold}</th>
            <th>{sale.profit}</th>
            {!returnItem && 
            <th>
                <Button color='warning' size='sm' onClick={() => {
                    setReturn(true);
                    setReturningItem(sale);
                    }}>Return
                </Button> 
            </th>
            }
        </tr>
    ))
    
    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date} onChange={date => {setDateAndResetProfit(date)}} />
                    </Col>
                </FormGroup>
            </Form>
            <div style={Center}>
                <Table responsive hover>
                    {returnItem && renderReturnSale()}
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Item</th>
                            <th>Model</th>
                            <th>Count</th>
                            <th>Rate</th>
                            <th>Profit</th>
                            <th></th>
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

export default SalesStats;