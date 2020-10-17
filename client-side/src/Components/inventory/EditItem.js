import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input, Toast, ToastBody, ToastHeader } from 'reactstrap'

import { edit_item } from '../../Redux/ActionCreators';

function EditItemForm(props) {

    const dispatch = useDispatch()

    const _id = props.item._id;
    const [name,setName] = useState(props.item.name)
    const [model,setModel] = useState(props.item.model)
    const [count,setPieces] = useState(props.item.count)
    const [cost_price,setCost] = useState(props.item.cost_price)

    const nameChange = e => setName(e.target.value)
    const modelChange = e => setModel(e.target.value)
    const pieceChange = e => setPieces(e.target.value)
    const costChange = e => setCost(e.target.value)

    const saveChanges = () => {
        dispatch(edit_item(_id, name, count, model, cost_price));
        
    }

    return (
            <tr>
                <th><Input type='text' autoComplete='off' value={name} onChange={nameChange} /></th>
                <th><Input type='text' autoComplete='off' value={model} onChange={modelChange} /></th>
                <th><Input type='text' autoComplete='off' value={count} disabled /></th>
                <th><Input type='text' autoComplete='off' value={cost_price} onChange={costChange} /></th>
                <th><Button color='warning' size='sm' onClick={saveChanges}>Update</Button> </th>
            </tr>
    )

}

export default EditItemForm;