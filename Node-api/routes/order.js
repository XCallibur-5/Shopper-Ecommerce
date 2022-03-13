const Order = require("../models/Order");
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken")

//----------CREATE------------

router.post('/', verifyToken, async (req,res)=>{
    const createdOrder = new Order(req.body);
    const savedOrder = await createdOrder.save();
    res.json(savedOrder);
})

//---------READ-User Order------------

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
      const orders = await Order.find({ userId: req.params.userId });
      res.json(orders);
  });


  //----------------Find All---------------

router.get("/", verifyAdmin, async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
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