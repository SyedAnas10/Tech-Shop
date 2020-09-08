const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    count: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    cost_price: {
        type: Number,
        required: true
    },
    retail_price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;