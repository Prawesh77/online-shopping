const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path= require ('path');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

//Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/onlineShopping'; // Replace with your connection string
mongoose.connect(mongoURI)
   .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));


// Importing route
const productRoutes = require('./routes/productRoute');
const loginRoutes = require('./routes/loginRoute');
const registerRoutes = require('./routes/registerRoute');
// const protectedRoutes = require('./routes/protectedRoute');
const cartRoutes = require('./routes/cartRoute');
// const userRoutes = require('./routes/userRoute');


// routes/api points haru define
app.use('/product', productRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
// app.use('/protected', protectedRoutes);
app.use('/cart', cartRoutes);
// app.use('/users', userRoutes);



// app.get('/user', (req, res) => {
//     console.log('hello from Node.js server!');
//     res.send('Hello from your Node.js server!');
//   });

app.listen(port, () => console.log(`Server listening on port ${port}`));