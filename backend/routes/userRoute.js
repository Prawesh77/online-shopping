// const express = require('express');
// const app = express.Router();
// const User = require('../models/user_details'); // Import the user_details model


// app.post('/', async (req, res) => {
//     try {
//       const newUser = new User(req.body);
//       await newUser.save();
//       res.status(201).json({ message: 'User added successfully' });
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

//   app.get('/', async (req, res) => {
//     try {
//       const users = await User.find();
//       console.log("users fetched from database");
//       res.json(users);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });

// module.exports = app;