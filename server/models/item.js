const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema - defines data
const itemSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;