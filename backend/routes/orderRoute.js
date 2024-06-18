// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('../models/user_details'); // Path to your User model
// const Product = require('../models/product'); // Path to your Product model
// const Order = require('../models/order'); // Path to your Order model

// const app = express.Router();
// app.use(express.json()); // For parsing application/json

// // API endpoint to handle product ordering
// app.post('/', async (req, res) => {
//     console.log(req.body);
//     const { userid, productid, quantity, deliveryAddress } = req.body;
    
//     // const parsedDetails = typeof deliveryAddress === 'string' ? JSON.parse(deliveryAddress) : deliveryAddress;
//     // const {fullName, address, contactNo, city, state  } = parsedDetails;
    
//     const userIdObj =new mongoose.Types.ObjectId(userid);
//     const productIdObj =new mongoose.Types.ObjectId(productid);
//     try {
      
  
//       // Validate request body
//       if (!userid || !productid || !quantity || !deliveryAddress) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }
  
//       // Find the user
//       const user = await User.findById(userid);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Find the product
//       const product = await Product.findById(productid);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Check if the product is in stock
//       if (product.instock < quantity) {
//         return res.status(400).json({ message: 'Not enough stock available' });
//       }
  
//       // Find if an order already exists for this user
//       let order = await Order.findOne( { userid: userIdObj } );
  
//       if (order) {
//         // Check if the product is already in the user's order
//         const existingProductOrder = order.order.find(
//           item => item.productId.toString() === productid
//         );
  
//         if (existingProductOrder) {
//           // Update the existing order quantity if it's in stock
//           if (product.instock >= existingProductOrder.quantity + quantity) {
//             existingProductOrder.quantity += quantity;
//           } else {
//             return res.status(400).json({ message: 'Not enough stock available' });
//           }
//         } else {
//           // Add the new product to the existing order
//           order.order.push({
//             productId: productid,
//             quantity,
//             deliveryAddress,
//             status: 'pending',
//           });
//         }
//       } else {
//         // Create a new order for the user
//         order = new Order({
//           userid,
//           order: [
//             {
//               productId: productid,
//               quantity,
//               deliveryAddress,
//               status: 'pending',
//             },
//           ],
//         });
//       }
  
//       // Save the order
//       await order.save();
  
//       // Update the user's order list in the User schema
//       const userOrder = user.order.find(
//         item => item.productId.toString() === productid
//       );
  
//       if (userOrder) {
//         userOrder.quantity += quantity;
//       } else {
//         user.order.push({
//           productId: productid,
//           quantity,
//         });
//       }
  
//       // Save the user
//       await user.save();
  
//       // Decrease product stock
//       product.instock -= quantity;
//       await product.save();
  
//       return res.status(200).json({ message: 'Order placed successfully' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// module.exports = app;



const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user_details'); // Path to your User model
const Product = require('../models/product'); // Path to your Product model
const Order = require('../models/order'); // Path to your Order model

const app = express.Router();
app.use(express.json()); // For parsing application/json

// API endpoint to handle product ordering
app.post('/', async (req, res) => {
    console.log(req.body);
    const { userid, order } = req.body;
    const{productId, quantity, deliveryAddress} = order;
    console.log(userid, productId, quantity, deliveryAddress);
    const status = "pending";
    const userIdObj = new mongoose.Types.ObjectId(userid);
    const productIdObj = new mongoose.Types.ObjectId(productId);

    try {
        // Validate request body
        if (!userid || !productId || !quantity || !deliveryAddress) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the user
        const user = await User.findById(userIdObj);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the product
        const product = await Product.findById(productIdObj);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product is in stock
        if (product.instock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Find if an order with pending status already exists for this user
        let order = await Order.findOne({ userid: userIdObj, 'order.status': 'pending' });

        if (order) {
            // Check if the product is already in the user's pending order
            const existingProductOrder = order.order.find(
                item => item.productId.toString() === productIdObj.toString() && item.status === 'pending'
            );

            if (existingProductOrder) {
                // Update the existing order quantity if it's in stock
                if (product.instock >= existingProductOrder.quantity + quantity) {
                    existingProductOrder.quantity += quantity;
                } else {
                    return res.status(400).json({ message: 'Not enough stock available' });
                }
            } else {
                // Add the new product to the existing pending order
                order.order.push({
                    productId: productIdObj,
                    quantity,
                    deliveryAddress,
                    status,
                });
            }
        } else {
            // Check for orders with a different status
            order = await Order.findOne({ userid: userIdObj });

            if (order) {
                // Add new product to the existing order with a different status
                order.order.push({
                    productId: productIdObj,
                    quantity,
                    deliveryAddress,
                    status,
                });
            } else {
                // Create a new order for the user
                order = new Order({
                    userid: userIdObj,
                    order: [
                        {
                            productId: productIdObj,
                            quantity,
                            deliveryAddress,
                            status,
                        },
                    ],
                });
            }
        }

        // Save the order
        await order.save();

        // Update the user's order list in the User schema
        const userOrder = user.order.find(
            item => item.productId.toString() === productIdObj.toString()
        );

        if (userOrder) {
            userOrder.quantity += quantity;
        } else {
            user.order.push({
                productId: productIdObj,
                quantity,
                deliveryAddress,
                status
            });
        }

        // Save the user
        await user.save();

        // Decrease product stock
        product.instock -= quantity;
        await product.save();

        return res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;



