const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchasing_Credit_Schema = Schema({
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
    total_cost: {
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

const Purchasing_Credit = mongoose.model('Purchasing_Credit', Purchasing_Credit_Schema);
module.exports = Purchasing_Credit;