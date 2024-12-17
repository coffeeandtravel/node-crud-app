const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    quantity: {
        type: Number,
        required: [true, "Please enter product quantity"],
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    image: {
        type: String,
        required: [false, "Pleae enter product imgage"]
    }
},
    {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema);

module.exports = Product;