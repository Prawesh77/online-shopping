const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    // Ensure all values are stored in lowercase to avoid case-sensitive duplicates
    set: v => v.toLowerCase()
  },
  label: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;