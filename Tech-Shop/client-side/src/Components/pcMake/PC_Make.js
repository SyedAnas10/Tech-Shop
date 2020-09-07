import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardText, Badge, Button } from 'reactstrap'

function MakeList() {
    const orders = useSelector(state => state.makeList)
    const Center = {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const renderList = orders.map(order => (
        <Card body key={order._id}>
            <CardHeader>{order.customer_name}</CardHeader>
            <CardBody>
                <CardText>
                    {order.specs_list.split(' ').map(item => (
                        <p>
                            {item}
                        </p>
                    ))}
                </CardText>
                <Button outline color='success'><Badge color='success'pill>Rs. {order.specs_retail}</Badge></Button>
            </CardBody>
        </Card>
    ))

    return(
        <div style={Center}>
            {renderList}
        </div>
    )
}

export default MakeList;