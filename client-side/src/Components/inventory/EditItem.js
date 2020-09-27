import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input } from 'reactstrap'

import { edit_item } from '../../Redux/ActionCreators';

function EditItemForm(props) {

    const dispatch = useDispatch()

    const _id = props.item._id;
    const [name,setName] = useState(props.item.name)
    const [model,setModel] = useState(props.item.model)
    const [count,setPieces] = useState(props.item.count)
    const [cost_price,setCost] = useState(props.item.cost_price)
    const [retail_price,setRetail] = useState(props.item.retail_price)

    const nameChange = e => setName(e.target.value)
    const modelChange = e => setModel(e.target.value)
    const pieceChange = e => setPieces(e.target.value)
    const costChange = e => setCost(e.target.value)
    const retailChange = e => setRetail(e.target.value)

    const saveChanges = () => {
        if(name&&model&&count) {
            alert(props.item)
            dispatch(edit_item(_id, name, count, model, cost_price, retail_price));

            setName('')
            setModel('')
            setPieces('')
            setCost('')
            setRetail('')
        }
    }

    return (
        <tr>
            <th><Input type='text' autoComplete='off' value={name} onChange={nameChange} /></th>
            <th><Input type='text' autoComplete='off' value={model} onChange={modelChange} /></th>
            <th><Input type='text' autoComplete='off' value={count} onChange={pieceChange} /></th>
            <th><Input type='text' autoComplete='off' value={cost_price} onChange={costChange} /></th>
            <th><Input type='text' autoComplete='off' value={retail_price} onChange={retailChange} /></th>
            <th><Button color='warning' size='sm' onClick={saveChanges}>Update</Button> </th>
        </tr>
    )

}

export default EditItemForm;