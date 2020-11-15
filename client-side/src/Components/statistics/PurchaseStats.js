import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, FormGroup, Label, Table, Button, Input } from 'reactstrap';

import { fetch_purchases_by_date, fetch_items, edit_purchase, edit_item } from '../../Redux/ActionCreators';

let total_expenses = 0;
let fetch_called = false;

function PurchaseStats() {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);
    const items = useSelector(state => state.items)
    const [returnItem, setReturn] = useState(false);
    const [returningItem, setReturningItem] = useState();
    const [return_count, set_return_count] = useState(0);
    const [date, setDate] = useState(new Date())
    const [showTotalExpenses, setShowTotalExpenses] = useState(false);
    useEffect(() => {
        dispatch(fetch_purchases_by_date(day, month, year));

        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
        }
        total_expenses = 0;
    }, [date, purchases])
    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    const setDateAndResetExpenses = (date) => {
        total_expenses = 0;
        setShowTotalExpenses(false);
        setDate(date);
    }

    const get_total_expenses = () => {
        purchases.purchases.forEach(purchase => {
            total_expenses += (purchase.total_cost);
        });
    }

    const show_total_expenses = () => {
        get_total_expenses();

        setShowTotalExpenses(true);
    }

    const return_item = () => {
        if(return_count > returningItem.count)
            alert('Error! Returning more items than sold')
        else {
            setReturn(false);
            let temp_item = items.items.filter(item => item.name === returningItem.item_name && item.model === returningItem.model)[0];
            dispatch(edit_item(temp_item._id, temp_item.name, (temp_item.count - Number(return_count)), temp_item.model, 
                            temp_item.cost_price, temp_item.retail_price));
            
            dispatch(edit_purchase(returningItem._id, (returningItem.count - return_count), 
                (returningItem.total_cost / returningItem.count) * (returningItem.count - return_count)))
        }
    }

    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

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
                    <th><Input type='text' value={returningItem.item_name} disabled/></th>
                    <th><Input type='number' autoComplete='off' value={return_count} onChange={(e) => set_return_count(e.target.value)} /></th>
                    <th><Button color='dark' size='sm' style={{marginLeft:'5px'}} onClick={() => setReturn(false)}>Cancel</Button></th>
                    <th><Button color='warning' size='sm' style={{marginLeft:'5px'}} onClick={() => return_item()}>Continue</Button></th>
                </tr>
            </tbody>
        </div>
        )
    }

    const renderPurchaseList = purchases.purchases.map(purchase => (
        <tr key={purchase._id}>
            <th scope='row'>{purchase.item_name}</th>
            <th>{purchase.model}</th>
            <th>{purchase.count}</th>
            <th>{purchase.total_cost}</th>
            {!returnItem && 
            <th>
                <Button color='warning' size='sm' onClick={() => {
                    setReturn(true);
                    setReturningItem(purchase)}}>
                        Return
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
                        <ReactDatePicker selected={date} onChange={date => {setDateAndResetExpenses(date)}} />
                    </Col>
                </FormGroup>
            </Form>
            <div style={Center}>
                <Table responsive hover>
                    {returnItem && renderReturnSale()}
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Count</th>
                            <th>Cost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPurchaseList}
                        <tr>
                            <th>Total Purchases : {purchases.purchases.length}</th>
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