const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Individual_Item_Sales_Credit_Schema = Schema({
    count: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
    },
    rate_sold: {
        type: Number,
        required: true
    },
    profit: {
        type: Number, 
    },
    customer_name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }, 
    day: {
        type: String
    },
    month: {
        type: String
    },
    year: {
        type: String
    }
}, {
    timestamps: true
});

const Individual_Item_Sales_Credit = mongoose.model('Individual_Item_Sales_Credit', Individual_Item_Sales_Credit_Schema);
module.exports = Individual_Item_Sales_Credit;