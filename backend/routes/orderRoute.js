const express = require('express');
const lodash = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/user_details'); // Path to your User model
const Product = require('../models/product'); // Path to your Product model
const Order = require('../models/order'); // Path to your Order model

const app = express.Router();
app.use(express.json()); // For parsing application/json

function detailedCompare(obj1, obj2) {
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                detailedCompare(obj1[key], obj2[key]);
            } else if (obj1[key] !== obj2[key]) {
                console.log(`Mismatch at key: ${key}, obj1: ${obj1[key]}, obj2: ${obj2[key]}`);
            }
        } else {
            console.log(`Missing key in one object: ${key}`);
        }
    }
}
app.post('/', async (req, res) => {
    const { userid, order } = req.body;
    const { productId, quantity, deliveryAddress } = order;
    deliveryAddress.contactNo = parseInt(deliveryAddress.contactNo);
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

        // Find an existing pending order for this user
        let order = await Order.findOne({ userid: userIdObj, 'order.status': 'pending' });

        if (order) {
            // Check if the product is already in the user's pending order
            const existingProductOrder = order.order.find(
                item => item.productId.toString() === productIdObj.toString() && item.status === 'pending'
            );

            if (existingProductOrder) {
                // Check if delivery addresses match before updating quantity
                const existingDeliveryAddress = existingProductOrder.deliveryAddress.toObject ? existingProductOrder.deliveryAddress.toObject() : existingProductOrder.deliveryAddress;
                detailedCompare(existingDeliveryAddress, deliveryAddress);
                if (existingDeliveryAddress===deliveryAddress) {
                    // Update the existing order quantity if addresses match and product is in stock
                    if (product.instock >= existingProductOrder.quantity + quantity) {
                        existingProductOrder.quantity += quantity;
                    } else {
                        return res.status(400).json({ message: 'Not enough stock available' });
                    }
                } else {
                    // If delivery addresses don't match, create a new order entry
                    order.order.push({
                        productId: productIdObj,
                        productName: product.details.name,
                        imageurl: product.imageurl,
                        quantity,
                        deliveryAddress,
                        status,
                    });
                }
            } else {
                // Add the new product to the existing pending order
                order.order.push({
                    productId: productIdObj,
                    productName: product.details.name,
                    imageurl: product.imageurl,
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
                    productName: product.details.name,
                    imageurl: product.imageurl,
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
                            productName: product.details.name,
                            imageurl: product.imageurl,
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
        user.orderId = order._id.toString();
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

// GET all order details endpoint
app.get('/all-order-details', async (req, res) => {
    try {
        // Fetch all orders and populate necessary fields
        const orders = await Order.find()
            .populate('userid', 'userName')
            .populate('order.productId', 'details.name details.price');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Prepare the response data
        const response = await Promise.all(
            orders.map(async (order) => {
                // Extract user details
                const user = order.userid;

                // Prepare the products list
                const products = order.order.map((item) => {
                    const product = item.productId;
                    // Determine dispatched and completed status
                    const dispatched = ['dispatched', 'delivered', 'completed'].includes(item.status);
                    const completed = item.status === 'completed';

                    return {
                        name: product.details.name,
                        dispatched,
                        completed,
                        price: item.priceUser || product.details.price,
                        quantity: item.quantity,
                        orderid: item._id
                    };
                });

                // Return the formatted response for each user
                return {
                    userOrderid: order._id,
                    username: user.userName,
                    products,
                };
            })
        );

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.post('/get-order', async (req, res) => {
    try {
        console.log("From get-order");
        console.log(req.body);
        const { userid } = req.body;
        console.log(userid);

        // Validate request body
        if (!userid) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Validate userid format
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const userIdObj = new mongoose.Types.ObjectId(userid);

        // Find the user and get their orderId(s)
        const user = await User.findById(userIdObj).lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user schema holds a single orderId as a string
        const orderId = user.orderId ? new mongoose.Types.ObjectId(user.orderId) : null;

        if (!orderId) {
            return res.status(404).json({ message: 'No order ID found for this user' });
        }

        // Fetch the orders using the orderId
        const order = await Order.findOne({ _id: orderId })
            .select('-userid -_id -__v -order.productId') // Exclude the userid, _id, and __v fields from the response
            .lean();

        if (order.length === 0 || order.length === 'null') {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        console.log(order);
        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.put('/update-status', async (req, res) => {
    try {
      // Destructure request body
      const { userorderid, productid, newStatus } = req.body;
      console.log("1",newStatus.dispatched === false);
      console.log("2",newStatus.dispatched === true);
      console.log("3",newStatus.completed === true);
      console.log("4",newStatus.cancelled === true);
      // Log the request body for debugging
      console.log('Request body:', req.body);
        
      // Find the order by its ID
      const order = await Order.findById(userorderid);
        console.log(order);
      // Check if the order is found
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Find the specific product in the order array
      const productOrder = order.order.find(item => item._id.toString() === productid);
      console.log(productOrder);
      // Check if the product in the order is found
      if (!productOrder) {
        return res.status(404).json({ message: 'Product in order not found' });
      }
      

      // Update the status based on newStatus conditions
      if (newStatus.dispatched === false) {
        productOrder.status = 'pending';
      } else if (newStatus.dispatched === true) {
        productOrder.status = 'dispatched';
      }
  
      if (newStatus.completed === true) {
        productOrder.status = 'completed';
      }
  
      if (newStatus.cancelled === true) {
        // Remove the product from the order array
        order.order = order.order.filter(item => item.productId.toString() !== productid);
  
        // If no products are left in the order, remove the entire order document
        if (order.order.length === 0) {
          await Order.findByIdAndDelete(userorderid);
          return res.status(200).json({ message: 'Order and all products cancelled and removed' });
        }
      }
  
      // Save the updated order document
      await order.save();
  
      // Respond with the updated order
      res.status(200).json({ message: 'Order status updated successfully', order });
  
    } catch (error) {
      // Log and respond with an error message
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = app;



