const express = require("express");
const app = express.Router();

app.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Add Category
app.post('/add-category', async (req, res) => {
    const { value, label } = req.body;
  
    try {
      // Use a case-insensitive regex to check if the category already exists
      const existingCategory = await Category.findOne({ 
        value: new RegExp(`^${value}$`, 'i') 
      });
  
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
  
      // Create and save the new category
      const newCategory = new Category({ value, label });
      await newCategory.save();
  
      return res.status(201).json(newCategory);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
  // Delete Category
  app.delete('/delete-category/:value', async (req, res) => {
    try {
      const result = await Category.deleteOne({ value: req.params.value });
      if (result.deletedCount > 0) {
        res.json({ message: 'Category deleted' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = app;