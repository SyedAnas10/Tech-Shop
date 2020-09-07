import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {_id:'1', customer_name:'Anas Waseem', specs_list: 'i7-8300 gtx-1080 64gb-SDD', specs_cost:'8000', specs_retail:'10000', profit:'',advance_payment:'5000'},
    {_id:'2', customer_name:'Asfar Jawaid', specs_list: 'i7-8300 gtx-750ti 64gb-HDD', specs_cost:'5000', specs_retail:'7000', profit:'',advance_payment:'1200'},
    {_id:'3', customer_name:'Mubbashir Ali', specs_list: 'i7-8300 gtx-1080 64gb-SDD', specs_cost:'3000', specs_retail:'6000', profit:'',advance_payment:'1000'},
    {_id:'4', customer_name:'Affan Ghazali', specs_list: 'i7-8300 gtx-1080', specs_cost:'1000', specs_retail:'3000', profit:'',advance_payment:'2000'},
    {_id:'5', customer_name:'Usman Siddiqui', specs_list: 'gtx-1080 64gb-SDD', specs_cost:'4000', specs_retail:'6000', profit:'',advance_payment:'3000'},
    {_id:'6', customer_name:'Areeb Siddiqui', specs_list: 'i7-6300 gtx-1080 64gb-SDD', specs_cost:'4000', specs_retail:'6000', profit:'',advance_payment:'3000'},
    {_id:'7', customer_name:'Ahsan Iftikhar', specs_list: 'i7-6300 gtx-1080 64gb-SDD', specs_cost:'4000', specs_retail:'6000', profit:'',advance_payment:'3000'},
    {_id:'8', customer_name:'Muhammad Usama', specs_list: '64gb-SDD', specs_cost:'4000', specs_retail:'6000', profit:'',advance_payment:'3000'},
]

const PCmakeSlice = createSlice({
    name: 'PCmake',
    initialState,
    reducers: {
        orderAdded(state, action) {
            action.payload._id = state.length+1
            state.unshift(action.payload)
            console.log(action.payload)
        }
    }
})

export const {orderAdded} = PCmakeSlice.actions

export default PCmakeSlice.reducer