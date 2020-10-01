import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import { useDispatch } from 'react-redux'

import { post_item } from '../../Redux/ActionCreators';

function AddItemForm() {
    
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [model,setModel] = useState('')
    const [count,setPieces] = useState('')
    const [cost_price,setCost] = useState('')

    const nameChange = e => setName(e.target.value)
    const modelChange = e => setModel(e.target.value)
    const pieceChange = e => setPieces(e.target.value)
    const costChange = e => setCost(e.target.value)

    const addItem = () => {
        if(name&&model&&count&&cost_price) {
            dispatch(post_item(name, model, count, cost_price));

            setName('')
            setModel('')
            setPieces('')
            setCost('')
        }
    }

    return (
        <tr>
            <th><Input type='text' autoComplete='off' value={name} onChange={nameChange} /></th>
            <th><Input type='text' autoComplete='off' value={model} onChange={modelChange} /></th>
            <th><Input type='text' autoComplete='off' value={count} onChange={pieceChange} /></th>
            <th><Input type='text' autoComplete='off' value={cost_price} onChange={costChange} /></th>
            <th><Button color='warning' size='sm' onClick={addItem}>Save</Button> </th>
        </tr>
    )
}

export default AddItemForm