const express = require("express");
const app = express.Router();
const Category = require('../models/category');

app.get('/', async (req, res) => {
  console.log("GET CALLED");
    try {
      const categories = await Category.find().select('-_id -__v');
      console.log(categories);
      res.json(categories);
    } catch (err) {
      console.log("error");
      res.status(500).send(err);
    }
  });
  
  // Add Category
app.post('/add-category', async (req, res) => {
    const { value, label } = req.body;
    console.log(req.body);
    console.log(".....................");
    
    try {
      //case-insensitive garayera check garna lai(works or not check garna baki) 
      const existingCategory = await Category.findOne({ 
        value: new RegExp(`^${value}$`, 'i') 
      });
  
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
  
      // Create and save the new category
      const newCategory = new Category({ value, label });
      await newCategory.save();

      const responseCategory = {
        value: newCategory.value,
        label: newCategory.label
      };
      console.log(responseCategory);
      return res.status(201).json(responseCategory);
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