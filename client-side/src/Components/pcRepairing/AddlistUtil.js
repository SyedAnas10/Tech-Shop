import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { post_pc_repairing } from '../../Redux/ActionCreators';

function AddWishListUtil() {
    
    const dispatch = useDispatch()
    const Center = {
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const [showToast, toggleToast] = useState(false)
    const [showError, toggleError] = useState(false)

    const [item,setItem] = useState('')
    const [serial_no,setNo] = useState('')
    const [customer_name,setName] = useState('')
    const [contact_number,setContact] = useState('')
    const [repair_cost,setRepairCost] = useState('')
    const [retail_cost,setRetailCost] = useState('')
    const [details,setDetails] = useState('')

    const customer_nameChange = e => setName(e.target.value)
    const item_change = e => setItem(e.target.value)
    const serial_change = e => setNo(e.target.value)
    const contact_change = e => setContact(e.target.value)
    const cost_change = e => setRepairCost(e.target.value)
    const retail_change = e => setRetailCost(e.target.value)
    const details_change = e => setDetails(e.target.value)

    const saveChanges = () => {
        if(item && serial_no && customer_name && contact_number && repair_cost && retail_cost && details) {

            toggleToast(true);
            window.setTimeout(() => {
                toggleToast(false)
            },2000)

            dispatch(post_pc_repairing(item, serial_no, customer_name, contact_number, repair_cost, retail_cost, details));

            setItem('')
            setNo('')
            setName('')
            setContact('')
            setRepairCost('')
            setRetailCost('')
            setDetails('')
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
                <Label sm={1}>Item</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={item} onChange={item_change} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Serial No</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={serial_no} onChange={serial_change} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Customer Name</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={customer_name} onChange={customer_nameChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Contact No</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={contact_number} onChange={contact_change} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Repair Cost</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={repair_cost} onChange={cost_change} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Retail Cost</Label>
                <Col sm={5}>
                <Input type="text" autoComplete='off' value={retail_cost} onChange={retail_change} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={1}>Details</Label>
                <Col sm={5}>
                <Input type='textarea' rows='6' value={details} onChange={details_change}  />
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
                    Repair order has been stored succesfully.
                </Alert>
                <Alert color='danger' isOpen={showError}>
                    Please fill out all the fields.
                </Alert>
                </Col>
            </FormGroup>

        </Form>
    )

}

export default AddWishListUtil;

