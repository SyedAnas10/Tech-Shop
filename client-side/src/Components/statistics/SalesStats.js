import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button, Input } from 'reactstrap';

import { fetch_sales_by_date, fetch_items, edit_item, edit_items_sales, delete_item_sales } from '../../Redux/ActionCreators';

let total_profit = 0;
let fetch_called = false;

function SalesStats() {

    const dispatch = useDispatch();
    const sales = useSelector(state => state.sales_stats);
    const items = useSelector(state => state.items)
    const [returnItem, setReturn] = useState(false);
    const [returningItem, setReturningItem] = useState();
    const [return_count, set_return_count] = useState(0);
    const [date, setDate] = useState(new Date())
    const [showTotalProfit, setShowTotalProfit] = useState(false);
    useEffect(() => {
        dispatch(fetch_sales_by_date(day, month, year));
        if(!fetch_called) {
            dispatch(fetch_items())
            fetch_called = true;
        }

        total_profit = 0;
    }, [date, sales])
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

    const return_item = () => {
        if(return_count > returningItem.count)
            alert('Error! Returning more items than sold')
        else {
            setReturn(false);
            let temp_item = items.items.filter(item => item.name === returningItem.name && item.model === returningItem.model)[0];
            dispatch(edit_item(temp_item._id, temp_item.name, (temp_item.count + Number(return_count)), temp_item.model, 
                            temp_item.cost_price, temp_item.retail_price));
            if(return_count != returningItem.count) {
                dispatch(edit_items_sales(returningItem._id, (returningItem.count - return_count), 
                    (returningItem.rate_sold / returningItem.count) * (returningItem.count - return_count), 
                    ((returningItem.rate_sold / returningItem.count) * (returningItem.count - return_count)) - (temp_item.cost_price * (returningItem.count - return_count))))
            }
            else {
                dispatch(delete_item_sales(returningItem._id));
            }
        }
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
                    <th><Input type='number' autoComplete='off' value={return_count} onChange={(count) => set_return_count(count.target.value)} /></th>
                    <th><Button color='dark' size='sm' style={{marginLeft:'5px'}} onClick={() => setReturn(false)}>Cancel</Button></th>
                    <th><Button color='warning' size='sm' style={{marginLeft:'5px'}} onClick={() => return_item()}>Continue</Button></th>
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