const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sales_Credit_Schema = Schema({
    item_name: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    count: {
        type: Number,
        required: true
    },
    rate_sold: {
        type: Number,
        required: true
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
    payed: {
        type: Boolean,
        default: false
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

const Sales_Credit = mongoose.model('Sales_Credit', Sales_Credit_Schema);
module.exports = Sales_Credit;