import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Col, Form, FormGroup, Label, Table } from 'reactstrap';

function CashFlow() {

    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())
    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const date_string = date.toString();
    const month = date_string.slice(4, 7);
    const day = date_string.slice(8, 10);
    const year = date_string.slice(11, 15);

    return (
        <div>
            <Form style={Center}>
                <FormGroup row>
                    <Label for='date' sm={1}>Select Date</Label>
                    <Col>
                        <ReactDatePicker selected={date}/>
                    </Col>
                </FormGroup>
            </Form>
            <div style={Center}>
                <Table hover responsive>
                    <thead>
                        <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                            <th>Sales Profit</th>
                            <th>Repair Profit</th>
                            <th>Make Profit</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        </div>
    )
}

export default CashFlow;