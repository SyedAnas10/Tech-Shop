import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, FormGroup, Label, Table } from 'reactstrap';

import { fetch_sales_by_date, 
        fetch_pc_making_by_date, 
        fetch_pc_repair_by_date,
        fetch_purchases_by_date } from '../../Redux/ActionCreators';

let fetch_called = false;

function CashFlow() {

    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    const sales = useSelector(state => state.sales_stats);
    const pc_make = useSelector(state => state.pc_make_stats);
    const pc_repair = useSelector(state => state.pc_repair_stats);
    const purchases = useSelector(state => state.purchases);
    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!fetch_called) {
            fetch_called = true;

            dispatch(fetch_pc_making_by_date(day, month, year));
            dispatch(fetch_pc_repair_by_date(day, month, year));
            dispatch(fetch_sales_by_date(day, month, year));
            dispatch(fetch_purchases_by_date(day, month, year));
        }
        // alert(JSON.stringify(sales.stats))
    }, [date,
        sales.stats,
        pc_repair.stats,
        pc_make.stats,
        purchases.purchases]);

    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

    const get_sales_cash_in = () => {
        let sales_cash_in = 0;

        sales.stats.forEach(stat => {
            sales_cash_in += stat.rate_sold;        
        });

        return sales_cash_in;
    }

    const get_pc_make_cash_in = () => {
        let pc_make_cash_in = 0;

        pc_make.stats.forEach(stat => {
            pc_make_cash_in += stat.specs_retail;        
        });

        return pc_make_cash_in;
    }

    const get_pc_repair_cash_in = () => {
        let pc_repair_cash_in = 0;

        pc_repair.stats.forEach(stat => {
            pc_repair_cash_in += stat.retail_cost;        
        });

        return pc_repair_cash_in;
    }

    const get_purchases_cash_out = () => {
        let purchases_cash_out = 0;

        purchases.purchases.forEach(stat => {
            purchases_cash_out += stat.total_cost;        
        });

        return purchases_cash_out;
    }

    const get_pc_make_cash_out = () => {
        let pc_make_cash_out = 0;

        pc_make.stats.forEach(stat => {
            pc_make_cash_out += stat.specs_cost;        
        });

        return pc_make_cash_out;
    }

    const get_pc_repair_cash_out = () => {
        let pc_repair_cash_out = 0;

        pc_repair.stats.forEach(stat => {
            pc_repair_cash_out += stat.repair_cost;        
        });

        return pc_repair_cash_out;
    }

    const resetValues = (date) => {
        fetch_called = false;

        setDate(date);
    }

    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date} onChange={date => resetValues(date)} />
                    </Col>
                </FormGroup>
            </Form>
            <div style={Center}>
                <Table hover responsive>
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Inventory Items Cash In</th>
                            <th>PC Repair Cash In</th>
                            <th>PC Make Cash In</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                {get_sales_cash_in()}
                            </th>
                            <th>
                                {get_pc_repair_cash_in()}
                            </th>
                            <th>
                                {get_pc_make_cash_in()}
                            </th>
                        </tr>
                    </tbody>
                </Table>

                <Table hover responsive>
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Inventory Items Cash Out</th>
                            <th>PC Repair Cash Out</th>
                            <th>PC Make Cash Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                {get_purchases_cash_out()}
                            </th>
                            <th>
                                {get_pc_repair_cash_out()}
                            </th>
                            <th>
                                {get_pc_make_cash_out()}
                            </th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CashFlow;