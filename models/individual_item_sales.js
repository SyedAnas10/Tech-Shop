const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Individual_Item_Sales_Schema = Schema({
    count: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rate_sold: {
        type: Number,
        required: true
    },
    profit: {
        type: Number, 
    }
}, {
    timestamps: true
});

const Individual_Item_Sales = mongoose.model('Individual_Item_Sales', Individual_Item_Sales_Schema);
module.exports = Individual_Item_Sales;