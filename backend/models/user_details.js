const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true }
  },
  userName: { type: String, required: true, unique: true },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  imageurl: { type: String },
  order: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
    deliveryAddress: {
      fullName: { type: String },
      address: { type: String },
      contactNo: { type: Number },
      city: { type: String },
      state: { type: String },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'dispatched', 'delivered', 'cancelled'],
      default: 'pending'
    }
  }]
},
  {
    timestamps: true,
  });
const User = mongoose.model('User', userSchema);
module.exports = User; 