import React, { useState, useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_items, post_sales_credit } from '../Redux/ActionCreators';

import { post_sales, decrease_item_count } from '../Redux/ActionCreators';
import ReactDatePicker from 'react-datepicker';

let fetch_called = false;

function Sales() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
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
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [showToast,toggleToast] = useState(false)
    const [showError, toggleError] = useState(false)
    const [onCredit, toggleCredit] = useState(false)

    const [cname, setCname] = useState('')
    const [cnumber, setCnumber] = useState('')
    const [dueDate, setDate] = useState(new Date())

    const renderOptions = products.items.map(product => 
        <option value={product.name}/>
    );
    const renderModels = products.items.filter(product => product.name === item).map(models => 
        <option value={models.model} />
    );

    const onRegister = () => {
        const prod = products.items.filter(prod_item => prod_item.name === item && prod_item.model === model);
        if(prod[0].count < count) {        
            toggleError(true);
            window.setTimeout(() => {
                toggleError(false)
            },3000)
        }
        else {
            dispatch(post_sales(item, model, count, rate, (rate - prod[0].cost_price * count)));
            dispatch(decrease_item_count(prod[0]._id, (prod[0].count - count)));
            dispatch(post_sales_credit(item, model, count, rate, cname, cnumber, dueDate));

            set_item('')
            set_model('')
            set_count('')
            set_rate('')

            toggleToast(true);
            window.setTimeout(() => {
                toggleToast(false)
            },3000)
        }
    }

    function showCredit() {
        return (
            <div>
                <FormGroup row>
                    <Label for='cname' sm={1}>Customer Name</Label>
                    <Col sm={5}>
                    <Input type='text' name='cname' value={cname} onChange={value => {setCname(value.target.value)}}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='cname' sm={1}>Phone Number</Label>
                    <Col sm={5}>
                    <Input type='text' name='cnumber' value={cnumber} onChange={value => {setCnumber(value.target.value)}}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='duedate' sm={1}>Due-Date</Label>
                    <Col sm={5}>
                    <ReactDatePicker selected={dueDate} onChange={date => setDate(date)} />
                    </Col>
                </FormGroup>
            </div>
        )
    }

    return (
        <div>
        <Form style={Center}>
            <FormGroup row>
                <Label for='check' sm={1}>On Credit?</Label>
                <Col sm={5}>
                    <Input type='checkbox' name='check' defaultChecked={onCredit} onChange={value => toggleCredit(value.target.checked)}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={1}>Item Name</Label>
                <Col sm={5}>
                <Input type="text" name="name" value={item} onChange={value => set_item(value.target.value)} placeholder="Enter item name" list='products' autoComplete='off'/>
                <datalist id='products'>
                    {renderOptions}
                </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="model" sm={1}>Model</Label>
                <Col sm={5}>
                <Input type="text" name="model" value={model} onChange={value => set_model(value.target.value)} placeholder="Enter model" list='models' autoComplete='off' />
                <datalist id='models'>
                    {renderModels}
                </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="count" sm={1}>Count</Label>
                <Col sm={5}>
                <Input type="number" value={count} onChange={value => set_count(value.target.value)} name="count" id="count" placeholder='0' autoComplete='off'/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="rate_sold" sm={1}>Rate Sold</Label>
                <Col sm={5}>
                <Input type="number" value={rate} onChange={value => set_rate(value.target.value)} name="rate_sold" id="rate_sold" placeholder='Rs.' autoComplete='off'/>
                </Col>
            </FormGroup>

            {onCredit && showCredit()}
            
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 1 }}>
                <Button onClick={onRegister} >Register Sale</Button>
                </Col>
                <Alert color="success" isOpen={showToast}>
                    Sales Registered succesfully.
                </Alert>
                <Alert color="danger" isOpen={showError}>
                    You dont have enough items in your inventory.
                </Alert>
            </FormGroup>
        </Form>
        </div>
    )
}

export default Sales;