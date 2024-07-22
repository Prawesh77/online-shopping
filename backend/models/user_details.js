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
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  imageurl: { type: String },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
},
},
  {
    timestamps: true,
  });
const User = mongoose.model('User', userSchema);
module.exports = User; 