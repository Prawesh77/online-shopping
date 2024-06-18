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
        quantity: {
            type: Number,
            default: 1,
        },
        deliveryAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            contactNo: { type: Number, required: true},
            city: { type: String, required: true },
            state: { type: String, required: true },
      },
      status: {
          type: String,
          enum: ['pending', 'processing', 'dispatched', 'delivered', 'cancelled'],
          default: 'pending'
        },
      }
    ],
    
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;