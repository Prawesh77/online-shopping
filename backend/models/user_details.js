const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
      firstName: { type: String, required: true },
      middleName: {type: String},
      lastName: { type: String, required: true }
    }, 
    userName:{type: String},
    address: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin:{type: Boolean, default: false}
  },
  {
    timestamps: true,
  });
const User = mongoose.model('User', userSchema);
module.exports = User; 