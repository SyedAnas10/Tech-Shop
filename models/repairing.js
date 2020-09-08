const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Repairing_Schema = Schema({
    item: {
        type: String,
        required: true
    },
    serial_no: {
        type: Number,
    },
    customer_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
    },
    repair_cost: {
        type: Number,
    },
    retail_cost: {
        type: Number
    },
    profit: {
        type: Number
    },
    details: {
        type: String
    }
}, {
    timestamps: true
});

const Reparing = mongoose.model('Repairing', Repairing_Schema);
module.exports = Reparing;