const express = require('express');
const bcrypt = require('bcryptjs');
const app = express.Router();
const User = require('../models/user_details');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile'); // Save images in public/profile
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to filename
    },
  });
const upload = multer({ storage: storage });
app.post('/new-user',upload.single('image'), async (req, res) => {
    const { name, userName, address, email, password } = req.body;
    console.log(req.body);
    const parsedDetails = typeof name === 'string' ? JSON.parse(name) : name;
    const {firstName, middleName, lastName} = parsedDetails;

    const imageUrl = req.file ? `/profile/${req.file.filename}` : '';
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: { firstName, middleName, lastName }, userName, address, email, password: hashedPassword, imageurl: imageUrl });
    console.log(newUser);
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