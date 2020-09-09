import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { _id: '1', name: 'i3-650', model: 'Acer', retail_price: '18000', cost_price: '15000', count: 20 },
    { _id: '2', name: 'i5-7300', model: 'intel', retail_price: '50000', cost_price: '40000', count: 9 },
    { _id: '3', name: 'i6-7300', model: 'intel', retail_price: '50000', cost_price: '40000', count: 13 },
    { _id: '4', name: 'i7-7300', model: 'intel', retail_price: '50000', cost_price: '40000', count: 10 },
    { _id: '5', name: 'bloody', model: 'AMD', retail_price: '50000', cost_price: '40000', count: 20 },
    { _id: '6', name: 'x6004 printer', model: 'Canon', retail_price: '50000', cost_price: '40000', count: 5 },
    { _id: '7', name: '4gb RAM', model: 'TATA', retail_price: '50000', cost_price: '40000', count: 7 }
]

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        productAdded(state, action) {
            action.payload._id = state.length+1
            state.unshift(action.payload)
            console.log(action.payload)
        }
    }
})

export const {productAdded} = inventorySlice.actions

export default inventorySlice.reducer