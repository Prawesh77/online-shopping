const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/user_details");
const Product = require("../models/product");
const app = express.Router();


app.post("/addtocart", async (req, res) => {
  let { userId, productid, quantity } = req.body;
  console.log(req.body);
  
  if(quantity === undefined || quantity === null){
    quantity=1;
  }
  try {
    // Check if the user's cart already exists
    const existingUser = await Cart.findOne({ userId });
    if (existingUser) {

      const existingProductIndex = existingUser.products.findIndex(
        (item) => String(item.productId) === String(productid)
      );
      //quantity 0 bhaye splice, natra 1, -1 aauxa quantity maa so add garda, add pani sub pani 
          if(quantity == 0){
            if (existingProductIndex !== -1) {
            existingUser.products.splice(existingProductIndex, 1);
            }
          }
          else{
          if (existingProductIndex !== -1) {
            //add quantity
            const updatedQuantity = existingUser.products[existingProductIndex].quantity += quantity;
            if (updatedQuantity > 0) {
              existingUser.products[existingProductIndex].quantity = updatedQuantity;
            } else {
              // -1 aako bela 0 bhaye tyo quantity splice garney
              existingUser.products.splice(existingProductIndex, 1);
            }
          
          } else {
            existingUser.products.push({ productId: productid, quantity });
          }
        }
      
      await existingUser.save();
      res.status(200).json(existingUser);
    } else {
      //push new user, productid and quantity
      const cart = new Cart({
        userId,
        products: [{ productId: productid, quantity }],
      });
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.get("/", async (req, res) => {
  const {userId} = req.query;
  console.log(req.query);
  try {
    const userIdObj = new mongoose.Types.ObjectId(userId);
    // Check if the user's cart already exists
    const existingUser = await Cart.findOne( { userId: userIdObj } );
    console.log(userIdObj);
    if (existingUser) {
      // If user's cart exists, return the cart data
      res.status(200).json(existingUser);
    } else {
      // If user's cart doesn't exist, return a 404 status
      res.status(404).json({ error: 'Cart not found for the user' });
    }
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
