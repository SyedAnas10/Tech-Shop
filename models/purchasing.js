const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchasing_Schema = Schema({
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

const Purchasing = mongoose.model('Purchasing', Purchasing_Schema);
module.exports = Purchasing;