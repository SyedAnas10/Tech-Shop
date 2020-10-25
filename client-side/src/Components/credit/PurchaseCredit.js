import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardText, Spinner } from 'reactstrap';
import { edit_purchasing_credit, fetch_purchasing_credit } from '../../Redux/ActionCreators';

let fetch_called = false;

function PurchaseCredit() {
    const dispatch = useDispatch();
    const purchasing_credit = useSelector(state => state.purchasing_credit);

    const Center = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
    const CardBox = {
        maxWidth: '300px',  
        border: '0.5px solid lightgray',
        margin: '10px',
        textAlign: 'center'
    }
    const LoadCenter = {
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_purchasing_credit());
            fetch_called = true;
        }
    }, [purchasing_credit]);

    function creditDone(credit) {
        dispatch(edit_purchasing_credit(credit._id,true))
        dispatch(fetch_purchasing_credit())
    }

    const renderList = purchasing_credit.purchasing_credit.filter(c => c.payed === false).map(credit => (
        <Card body key={credit._id} style={CardBox}>
            <CardHeader>{credit.customer_name}</CardHeader>
            <CardBody>
                <CardText>{credit.model} - {credit.item_name}</CardText>
                <b>Payment : </b> Rs. {credit.rate_sold} <br/>
                <b>Due Date : </b> {credit.day}-{credit.month}-{credit.year}
            </CardBody>
            <Button className='mt-3' color='success' onClick={() => {creditDone(credit)}}>Mark Completed</Button>
        </Card>
    ))

    if(purchasing_credit.isLoading) {
        return(
            <div style={LoadCenter}>
                <Spinner color="success" style={{ width: '3rem', height: '3rem' }} />
            </div>
        );
    }
    else {
        if( purchasing_credit.purchasing_credit.filter(c => c.payed === false).length === 0 )
            return (
                <div style={Center}>
                    No pending credit.
                </div>
            );
        else {
            return (
                <div style={Center}>
                    {renderList}
                </div>
            );
        }
    }
}

export default PurchaseCredit