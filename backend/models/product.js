const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // // _id: mongoose.Schema.Types.ObjectId,
  // _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
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
});

module.exports = mongoose.model('Product', productSchema); // Export the model



