import React, { useState, useEffect } from 'react'
import { Button, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import { post_item, fetch_items, edit_item } from '../../Redux/ActionCreators';

let fetch_called = false;

function AddItemForm() {
    
    const dispatch = useDispatch()
    const products = useSelector(state => state.items)
    useEffect(() => {
        if(!fetch_called) {
            dispatch(fetch_items());
            fetch_called = true;
        }
    }, [products.items]);

    let itemAlreadyAdded = false;
    let tempId, tempCount, tempCost;

    const [name,setName] = useState('')
    const [model,setModel] = useState('')
    const [count,setPieces] = useState('')
    const [cost_price,setCost] = useState('')

    const nameChange = e => setName(e.target.value)
    const modelChange = e => setModel(e.target.value)
    const pieceChange = e => setPieces(e.target.value)
    const costChange = e => setCost(e.target.value)

    const addItem = () => {
        products.items.forEach(item => {
            if(name == item.name && model == item.model) {
                
                itemAlreadyAdded = true;
                tempId = item._id;
                tempCost = item.cost_price;
                tempCount = item.count;
            }
                
        });

        if(itemAlreadyAdded) {
            dispatch(edit_item(tempId, name, (tempCount + Number(count)), model, ((tempCost * tempCount + Number(cost_price)) / (tempCount + Number(count))), '0'));
            itemAlreadyAdded = false;
        }
        else 
            dispatch(post_item(name, model, count, (cost_price / count), '0'));

        setName('')
        setModel('')
        setPieces('')
        setCost('')

        alert('Item added in inventory')
    }

    const renderOptions = products.items.map(product => 
        <option value={product.name}/>
    );
    const renderModels = products.items.filter(product => product.name === name).map(models => 
        <option value={models.model} />
    );

    return (
        <tr>
            <th>
                <Input type='text' autoComplete='off' value={name} onChange={nameChange} list='products' />
                <datalist id='products'>
                        {renderOptions}
                </datalist>
            </th>
            <th>
                <Input type='text' value={model} onChange={modelChange} list='models' />
                <datalist id='models'>
                        {renderModels}
                </datalist>
            </th>
            <th><Input type='text' autoComplete='off' value={count} onChange={pieceChange} /></th>
            <th><Input type='text' autoComplete='off' value={cost_price} onChange={costChange} /></th>
            <th><Button color='warning' size='sm' onClick={addItem}>Save</Button> </th>
        </tr>
    )
}

export default AddItemForm