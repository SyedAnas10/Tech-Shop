const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', User_Schema);
module.exports = User;