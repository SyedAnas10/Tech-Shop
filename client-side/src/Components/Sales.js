import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { post_sales } from '../Redux/ActionCreators';

function Sales() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const [item, set_item] = useState('');
    const [rate, set_rate] = useState('');
    const [count, set_count] = useState(0);

    const renderOptions = products.items.map(product => (
        <option value={product.name}/>
    ));

    const onRegister = () => dispatch(post_sales(item, count, rate));

    return (
        <Form style={Center}>
            <FormGroup row>
                <Label for="name" sm={1}>Item Name</Label>
                <Col sm={5}>
                <Input type="text" name="name" value={item} onChange={value => set_item(value.target.value)} placeholder="Enter item name" list='products' />
                <datalist id='products'>
                    {renderOptions}
                </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="count" sm={1}>Count</Label>
                <Col sm={5}>
                <Input type="number" value={count} onChange={value => set_count(value.target.value)} name="count" id="count" placeholder='0' />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="rate_sold" sm={1}>Rate</Label>
                <Col sm={5}>
                <Input type="number" value={rate} onChange={value => set_rate(value.target.value)} name="rate_sold" id="rate_sold" placeholder='Rs.'/>
                </Col>
            </FormGroup>
            
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 1 }}>
                <Button onClick={onRegister} >Register Sale</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Sales;