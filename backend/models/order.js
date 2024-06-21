const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    userid:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
    order:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productName:{type: String},
        imageurl:{type: String},
        quantity: {
            type: Number,
            default: 1,
        },
        priceUser:{type: Number},
        priceAdmin:{type: Number},
        deliveryAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            contactNo: { type: Number, required: true},
            city: { type: String, required: true },
            state: { type: String, required: true },
      },
      status: {
          type: String,
          enum: ['pending', 'processing', 'dispatched', 'delivered', 'completed', 'cancelled'],
          default: 'pending'
        },
      }
    ],
    
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;