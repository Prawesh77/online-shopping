const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/user_details");
const Product = require("../models/product");
const app = express.Router();


// app.post("/addtocart", async (req, res) => {
//   let { userId, productid, quantity } = req.body;
//   // console.log(req.body);
  
//   if(quantity === undefined || quantity === null){
//     quantity=1;
//   }
//   try {
//     // Check if the user's cart already exists
//     const existingUser = await Cart.findOne({ userId });
//     if (existingUser) {

//       const existingProductIndex = existingUser.products.findIndex(
//         (item) => String(item.productId) === String(productid)
//       );
//       //quantity 0 bhaye splice, natra 1, -1 aauxa quantity maa so add garda, add pani sub pani 
//           if(quantity == 0){
//             if (existingProductIndex !== -1) {
//             existingUser.products.splice(existingProductIndex, 1);
//             }
//           }
//           else{
//           if (existingProductIndex !== -1) {
//             //add quantity
//             const updatedQuantity = existingUser.products[existingProductIndex].quantity += quantity;
//             if (updatedQuantity > 0) {
//               existingUser.products[existingProductIndex].quantity = updatedQuantity;
//             } else {
//               // -1 aako bela 0 bhaye tyo quantity splice garney
//               existingUser.products.splice(existingProductIndex, 1);
//             }
          
//           } else {
//             existingUser.products.push({ productId: productid, quantity });
//           }
//         }
//         console.log(existingUser);
//       await existingUser.save();
//       res.status(200).json(existingUser);
//     } else {
//       //push new user, productid and quantity
//       const cart = new Cart({
//         userId,
//         products: [{ productId: productid, quantity }],
//       });
//       await cart.save();
//       res.status(200).json(cart);
//     }
//   } catch (error) {
//     // console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



const fetchProductDetails = async (productIds) => {
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return products;
  } catch (error) {
    throw new Error("Error fetching product details");
  }
};

app.post("/addtocart", async (req, res) => {
  let { userId, productid, quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    quantity = 1;
  }

  try {
    // Check if the user's cart already exists
    let existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      const existingProductIndex = existingCart.products.findIndex(
        (item) => String(item.productId) === String(productid)
      );

      if (quantity == 0) {
        if (existingProductIndex !== -1) {
          existingCart.products.splice(existingProductIndex, 1);
        }
      } else {
        if (existingProductIndex !== -1) {
          const updatedQuantity = existingCart.products[existingProductIndex].quantity + quantity;
          if (updatedQuantity > 0) {
            existingCart.products[existingProductIndex].quantity = updatedQuantity;
          } else {
            existingCart.products.splice(existingProductIndex, 1);
          }
        } else {
          existingCart.products.push({ productId: productid, quantity });
        }
      }

      await existingCart.save();
    } else {
      existingCart = new Cart({
        userId,
        products: [{ productId: productid, quantity }],
      });
      await existingCart.save();
    }

    // Fetch product details for the product IDs in the cart
    const productIds = existingCart.products.map(item => item.productId);
    const productDetails = await fetchProductDetails(productIds);

    // Map product details to the cart products
    const detailedProducts = existingCart.products.map(cartProduct => {
      const productDetail = productDetails.find(product => String(product._id) === String(cartProduct.productId));
      return {
        ...cartProduct.toObject(),
        details: productDetail ? productDetail.toObject() : null,
      };
    });

    // Format the response
    const response = {
      _id: existingCart._id,
      userId: existingCart.userId,
      products: detailedProducts,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});










app.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }

  try {
    const userIdObj = new mongoose.Types.ObjectId(userId);

    // Check if the user's cart already exists
    const existingUserCart = await Cart.findOne({ userId: userIdObj });

    if (existingUserCart) {
      // Extract productIds from the cart
      const productIds = existingUserCart.products.map(item => item.productId);

      // Fetch detailed information for each product
      const productDetails = await fetchProductDetails(productIds);

      // Combine the cart data with product details
      const detailedProducts = existingUserCart.products.map(cartProduct => {
        const productDetail = productDetails.find(product => String(product._id) === String(cartProduct.productId));
        return {
          ...cartProduct.toObject(),
          details: productDetail ? productDetail.toObject() : null,
        };
      });

      // Format the response
      const response = {
        _id: existingUserCart._id,
        userId: existingUserCart.userId,
        products: detailedProducts,
      };

      res.status(200).json(response);
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
