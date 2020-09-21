import React, { useState, useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_items } from '../Redux/ActionCreators';

import { post_sales, decrease_item_count } from '../Redux/ActionCreators';

let fetch_called = false;

function Sales() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
        }
    }, [products.items]);

    const [model, set_model] = useState('');
    const [item, set_item] = useState('');
    const [rate, set_rate] = useState('');
    const [count, set_count] = useState(0);

    const renderOptions = products.items.map(product => (
        <option value={product.name}/>
    ));

    const renderModels = products.items.map(product => <option value={product.model} />);

    const onRegister = () => {
        const prod = products.items.filter(prod_item => prod_item.name === item && prod_item.model === model);
        if(prod[0].count < count) 
            alert('You don\'t have enough left in inventory');
        else {
            dispatch(post_sales(item, model, count, rate, (rate - prod[0].cost_price)));
            dispatch(decrease_item_count(prod[0]._id, (prod[0].count - count)));
        }
    }

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
                <Label for="model" sm={1}>Model</Label>
                <Col sm={5}>
                <Input type="text" name="model" value={model} onChange={value => set_model(value.target.value)} placeholder="Enter model" list='models' />
                <datalist id='models'>
                    {renderModels}
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
                <Label for="rate_sold" sm={1}>Rate Sold</Label>
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