const express = require('express');
const app = express.Router();
const Product = require('../models/product');
// const { exit } = require('process');

//API endpoints

app.get('/', async (req, res) => {
  console.log("Products fetched from database");
  try {
    const products = await Product.find();
    res.json(products);
    console.log("product fetch responsed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.post('/addnewproduct', async (req, res) => {
    const { category, details:{name, brand, price, size, watt, description}, instock } = req.body;
    try {
      let product = await Product.findOne({ 'details.name': name, 'details.brand': brand });

        if (product) {
            product.instock += Number(instock);
            // Aru pani change garna parey tala ko code
            // product.details.price = price;
            // product.details.size = size;
            // product.details.watt = watt;
            // product.details.description = description;
        } else {
            product = new Product({
                category,
                details: { name, brand, price, size, watt, description },
                instock:Number(instock)
            });
        }
        await product.save();
        res.status(201).send('Product Added');
    } catch (error) {   
        res.status(400).send('Error adding product');
        console.log(error);
    }
  });
  // app.post('/addnewproduct', async (req, res) => {
  //   const { category, details:{name, brand, price, size, watt, description}, instock } = req.body;
  //   const newProduct = new Product({ category, details:{name, brand, price, size, watt, description}, instock });
  //   try {
  //       await newProduct.save();
  //       res.status(201).send('Product Added');
  //   } catch (error) {   
  //       res.status(400).send('Error adding product');
  //       console.log(error);
  //   }
  // });

module.exports = app;