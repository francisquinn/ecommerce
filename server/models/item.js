const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema - defines data
const itemSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    price_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;