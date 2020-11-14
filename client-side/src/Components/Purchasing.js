import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { post_purchase, post_item, fetch_items, edit_item, post_purchase_credit } from '../Redux/ActionCreators';
import ReactDatePicker from 'react-datepicker';

let fetch_called = false;

function Purchasing() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
        }
    }, [products.items]);

    const [item_name, setName] = useState('');
    const [model, setModel] = useState('');
    const [count, setCount] = useState();
    const [total_cost, setCost] = useState();
    const [retail_price, setPrice] = useState();

    let itemAlreadyAdded = false;
    let tempId, tempCount, tempCost;

    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [showToast,toggleToast] = useState(false)
    const [onCredit, toggleCredit] = useState(false)

    const [cname, setCname] = useState('')
    const [cnumber, setCnumber] = useState('')
    const [dueDate, setDate] = useState(new Date())

    const renderOptions = products.items.map(product => 
        <option value={product.name}/>
    );
    const renderModels = products.items.filter(product => product.name === item_name).map(models => 
        <option value={models.model} />
    );

    const on_purchasing = () => {
        products.items.forEach(item => {
            if(item_name == item.name && model == item.model) {
                itemAlreadyAdded = true;
                tempId = item._id;
                tempCost = item.cost_price;
                tempCount = item.count;
            }
                
        });

        if(itemAlreadyAdded) {
            dispatch(edit_item(tempId, item_name, (tempCount + Number(count)), model, ((tempCost * tempCount + Number(total_cost)) / (tempCount + Number(count))), retail_price));
            itemAlreadyAdded = false;
        }
        else 
            dispatch(post_item(item_name, model, count, (total_cost / count), retail_price));

        dispatch(post_purchase(item_name, model, count, total_cost));
        
        if(onCredit)
            dispatch(post_purchase_credit(item_name, model, count, total_cost, cname, cnumber, dueDate));
        
        setName('')
        setModel('')
        setCount('')
        setCost('')
        setPrice('');

        toggleToast(true);
        window.setTimeout(() => {
            toggleToast(false)
        },3000)
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

    return(
        <Form style={Center}>
            <FormGroup row>
                <Label for='check' sm={1}>On Credit?</Label>
                <Col sm={5}>
                    <Input type='checkbox' name='check' defaultChecked={onCredit} onChange={value => toggleCredit(value.target.checked)}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='name' sm={1}>Item Name</Label>
                <Col sm={5}>
                    <Input type='text' name='name' value={item_name} onChange={event => setName(event.target.value)} list='products' autoComplete='off'/>
                    <datalist id='products'>
                        {renderOptions}
                    </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='model' sm={1}>Model</Label>
                <Col sm={5}>
                    <Input type='text' name='model' value={model} onChange={event => setModel(event.target.value)} list='models' autoComplete='off'/>
                    <datalist id='models'>
                        {renderModels}
                    </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='count' sm={1}>Count</Label>
                <Col sm={5}>
                    <Input type='number' name='count' value={count} onChange={event => setCount(event.target.value)} autoComplete='off'></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='cost' sm={1}>Wholesale Cost</Label>
                <Col sm={5}>
                    <Input type='number' name='cost' value={total_cost} onChange={event => setCost(event.target.value)} autoComplete='off'></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='price' sm={1}>Retail Price</Label>
                <Col sm={5}>
                    <Input type='number' name='price' value={retail_price} onChange={event => setPrice(event.target.value)} autoComplete='off'></Input>
                </Col>
            </FormGroup>

            {onCredit && showCredit()}

            <FormGroup check row>
                <Col sm={{ size:10 , offset:1 }}>
                    <Button onClick={on_purchasing}>
                        Record Purchase
                    </Button>
                </Col>
                <Alert color="success" isOpen={showToast}>
                    Item stored in the inventory list.
                </Alert>
            </FormGroup>
        </Form>
    )

}

export default Purchasing;