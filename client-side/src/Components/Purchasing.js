import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { post_purchase, post_item } from '../Redux/ActionCreators';

function Purchasing() {

    const dispatch = useDispatch();
    const [item_name, setName] = useState('');
    const [model, setModel] = useState('');
    const [count, setCount] = useState();
    const [total_cost, setCost] = useState();
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const on_purchasing = () => {
        dispatch(post_purchase(item_name, model, count, total_cost));
        dispatch(post_item(item_name, model, count, (total_cost / count), '0'));
    }

    return(
        <Form style={Center}>
            <FormGroup row>
                <Label for='name' sm={1}>Item Name</Label>
                <Col sm={5}>
                    <Input type='text' name='name' value={item_name} onChange={event => setName(event.target.value)}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for='model' sm={1}>Model</Label>
                <Col sm={5}>
                    <Input type='text' name='model' value={model} onChange={event => setModel(event.target.value)}></Input>
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
            </FormGroup>
        </Form>
    )

}

export default Purchasing;