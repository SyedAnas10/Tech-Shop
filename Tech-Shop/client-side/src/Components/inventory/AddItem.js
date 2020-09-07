import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { productAdded } from '../../Redux/InventorySlice'

function AddItemForm() {
    
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [model,setModel] = useState('')
    const [count,setPieces] = useState('')
    const [cost_price,setCost] = useState('')
    const [retail_price,setRetail] = useState('')

    const nameChange = e => setName(e.target.value)
    const modelChange = e => setModel(e.target.value)
    const pieceChange = e => setPieces(e.target.value)
    const costChange = e => setCost(e.target.value)
    const retailChange = e => setRetail(e.target.value)

    const saveChanges = () => {
        if(name&&model&&count&&cost_price&&retail_price) {
            dispatch(productAdded({
                _id: Number,
                name,model,count,cost_price,retail_price
            }))
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
            <th><Button color='warning' size='sm' onClick={saveChanges}>Save</Button> </th>
        </tr>
    )
}

export default AddItemForm