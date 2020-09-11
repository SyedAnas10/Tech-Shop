import React, { useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { fetch_items } from '../Redux/ActionCreators';

let fetch_called = false;

function Orders() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
        }
    }, [products.items])
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }


    if(products.isLoading) {
        return(
            <div>
                Loading
            </div>
        );
    }
    else {
        const renderOptions = products.items.map(product => (
            <option value={product.name}/>
        ))

        return (
            <Form style={Center}>
                <FormGroup row>
                    <Label for="name" sm={1}>Item Name</Label>
                    <Col sm={5}>
                    <Input type="text" name="name" id="name" autoComplete='off' placeholder="Enter item name" list='products' />
                    <datalist id="products">
                        {renderOptions}
                    </datalist>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="count" sm={1}>Count</Label>
                    <Col sm={5}>
                    <Input type="number" name="count" id="count" placeholder='0' />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="rate_sold" sm={1}>Rate</Label>
                    <Col sm={5}>
                    <Input type="number" name="rate_sold" id="rate_sold" placeholder='Rs.'/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                    <Button>Register Sale</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default Orders;