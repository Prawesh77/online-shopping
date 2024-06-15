const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express.Router();
const User = require('../models/user_details');

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        const payload = { userid:user._id ,username: user.userName, isAdmin: user.isAdmin, imageurl: user.imageurl };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/:id', async (req, res) => {
    try {
      const firstName = await User.findById(req.params.id);
      if (!firstName) {
        return res.status(404).json({ message: 'No Username' });
      }
      res.json(firstName.firstName);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = app;