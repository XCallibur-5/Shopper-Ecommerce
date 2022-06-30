const Order = require("../models/Order");
const User = require("../models/User");
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken")
// This is your test secret API key.
require('dotenv').config();
const Razorpay = require('razorpay');
const shortid = require('shortid')
var razorpay = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

//----------CREATE------------


router.post('/razorPay', async (req,res)=>{
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: req.body.money*100,
    currency: currency,
    payment_capture : 1,
    receipt: shortid.generate(),
    
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
})

router.post('/makeOrder/:userId', verifyTokenAndAuthorization, async (req,res)=>{
  console.log(req.body);
const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (err) {
      res.json(err);
    }
  })

//---------READ-User Order------------

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
      const orders = await Order.find({ userId: req.params.userId });
      res.json(orders);
  });

//-----------------------Find One Order----------
router.get("/findOne/:orderId/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const orders = await Order.findById(req.params.orderId);
  res.json(orders);
});

router.get("/mark/:orderId", verifyAdmin, async (req, res) => {
  const orders = await Order.findByIdAndUpdate(req.params.orderId, {status:'delivered'},{ new: true });
  res.json(orders);
});



  //----------------Find All---------------

router.get("/", verifyAdmin, async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

  //----------------Find All Users---------------

router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//----------Update------------

router.put("/:id", verifyAdmin, async (req, res) => { 
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedOrder);
    });

//---------Delete----------

router.delete("/:id", verifyAdmin, (req, res)=>{
    Order.findByIdAndDelete(req.params.id, (err, result) =>{
      if (err){
          console.log(err)
      }
      else{
          res.json("Deleted : ");
      }
  });
  })

    // GET MONTHLY INCOME
  
    // router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    //     const date = new Date();
    //     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    //     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
      
    //     try {
    //       const income = await Order.aggregate([
    //         { $match: { createdAt: { $gte: previousMonth } } },
    //         {
    //           $project: {
    //             month: { $month: "$createdAt" },
    //             sales: "$amount",
    //           },
    //         },
    //         {
    //           $group: {
    //             _id: "$month",
    //             total: { $sum: "$sales" },
    //           },
    //         },
    //       ]);
    //       res.status(200).json(income);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   });
  
module.exports = router