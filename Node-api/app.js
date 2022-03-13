const dotenv = require('dotenv');
const express = require('express');
var cors = require('cors');
const app = express()

const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');


app.use(express.static('public'))
const router = express.Router()
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/eComDB');
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/products', productRoute);



app.listen(4000, () => {
  console.log('app listening on port 4000')
})