const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema - defines data
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;