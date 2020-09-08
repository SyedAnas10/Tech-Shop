const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PC_Making_Schema = Schema({
    customer_name: {
        type: String,
        required: true
    },
    specs_list: {
        type: String
    },
    specs_cost: {
        type: Number,
    },
    specs_retail: {
        type: Number
    },
    profit: {
        type: Number
    },
    advance_payment: {
        type: Number
    }
}, {
    timestamps: true
});

const PC_Making = mongoose.model('PC_Making', PC_Making_Schema);
module.exports = PC_Making;