import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { post_purchase, post_item, fetch_items } from '../Redux/ActionCreators';

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
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [showToast,toggleToast] = useState(false)

    const renderOptions = products.items.map(product => 
        <option value={product.name}/>
    );
    const renderModels = products.items.filter(product => product.name === item_name).map(models => 
        <option value={models.model} />
    );

    const on_purchasing = () => {
        dispatch(post_purchase(item_name, model, count, total_cost));
        dispatch(post_item(item_name, model, count, (total_cost / count), '0'));
        
        setName('')
        setModel('')
        setCount('')
        setCost('')

        toggleToast(true);
        window.setTimeout(() => {
            toggleToast(false)
        },3000)
    }

    return(
        <Form style={Center}>
            <FormGroup row>
                <Label for='name' sm={1}>Item Name</Label>
                <Col sm={5}>
                    <Input type='text' name='name' value={item_name} onChange={event => setName(event.target.value)} list='products'/>
                    <datalist id='products'>
                        {renderOptions}
                    </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='model' sm={1}>Model</Label>
                <Col sm={5}>
                    <Input type='text' name='model' value={model} onChange={event => setModel(event.target.value)} list='models' />
                    <datalist id='models'>
                        {renderModels}
                    </datalist>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='count' sm={1}>Count</Label>
                <Col sm={5}>
                    <Input type='number' name='count' value={count} onChange={event => setCount(event.target.value)}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='cost' sm={1}>Wholesale Cost</Label>
                <Col sm={5}>
                    <Input type='number' name='cost' value={total_cost} onChange={event => setCost(event.target.value)}></Input>
                </Col>
            </FormGroup>

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