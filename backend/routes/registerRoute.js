const express = require('express');
const bcrypt = require('bcryptjs');
const app = express.Router();
const User = require('../models/user_details');

app.post('/new-user', async (req, res) => {
    console.log("Hey");
    console.log(req.body);
    const { name: { firstName, middleName, lastName }, userName, address, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: { firstName, middleName, lastName }, userName, address, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.get('/', async (req, res) => {
    res.send("Register");
});

module.exports = app;