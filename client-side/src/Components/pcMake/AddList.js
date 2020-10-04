import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { post_pc_making } from '../../Redux/ActionCreators';


function AddWishList() {
    
    const dispatch = useDispatch()
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [showToast, toggleToast] = useState(false)
    const [showError, toggleError] = useState(false)

    const [customer_name,setName] = useState('')
    const [specs_list,setList] = useState('')
    const [specs_cost,setCost] = useState('')
    const [specs_retail,setRetail] = useState('')
    const [advance_payment,setAdvance] = useState('')

    const customer_nameChange = e => setName(e.target.value)
    const specs_listChange = e => setList(e.target.value)
    const costChange = e => setCost(e.target.value)
    const retailChange = e => setRetail(e.target.value)
    const advanceChange = e => setAdvance(e.target.value)

    const saveChanges = () => {
        if(customer_name&&specs_list&&specs_cost&&specs_retail&&advance_payment) {

            toggleToast(true);
            window.setTimeout(() => {
                toggleToast(false)
            },2000)

            dispatch(post_pc_making(customer_name, specs_list, specs_cost, specs_retail, advance_payment))

            setName('')
            setList('')
            setCost('')
            setRetail('')
            setAdvance('')
        }
        else {
            toggleError(true);
            window.setTimeout(() => {
                toggleError(false)
            },2000)
        }
    }

    return (
        <Form style={Center}>
            <FormGroup row>
                <Label sm={1}>Customer Name</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={customer_name} onChange={customer_nameChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Specs</Label>
                <Col sm={5}>
                <Input type='textarea' rows='6' value={specs_list} onChange={specs_listChange}  />
                </Col>
            </FormGroup>
            <FormGroup row> 
                <Label sm={1}>Estd. Cost</Label>
                <Col sm={5}>
                    <Input type='number' value={specs_cost} onChange={costChange}/>
                </Col>
            </FormGroup>
            <FormGroup row> 
                <Label sm={1}>Estd. Retail</Label>
                <Col sm={5}>
                    <Input type='number' value={specs_retail} onChange={retailChange}/>
                </Col>
            </FormGroup>
            <FormGroup row> 
                <Label sm={1}>Advance Payment</Label>
                <Col sm={5}>
                    <Input type='number' value={advance_payment} onChange={advanceChange}/>
                </Col>
            </FormGroup>
            
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 1 }}>
                <Button onClick={saveChanges}>Create Order</Button>
                <div style={{padding:'10px'}}></div>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col>
                <Alert color='success' isOpen={showToast}>
                    PC-Make order has been stored succesfully.
                </Alert>
                <Alert color='danger' isOpen={showError}>
                    Please fill out all the fields.
                </Alert>
                </Col>
            </FormGroup>
            
        </Form>
    )

}

export default AddWishList;