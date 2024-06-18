const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String },
    details:{
        name: { type: String, required: true },
        brand: { type: String },
        price: { type: Number, required: true },
        size: [{ type: String }],
        watt: { type: String },
        description: { type: String }
    },    
    instock: { type: Number, required: true },
    imageurl: {type: String}
});

module.exports = mongoose.model('Product', productSchema);



