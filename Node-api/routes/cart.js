const Cart = require("../models/Cart");
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken")

//----------CREATE------------

router.post('/', verifyToken, async (req,res)=>{
    const createdCart = new Cart(req.body);
    const savedCart = await createdCart.save();
    res.json(savedCart);
})

//---------READ-User Cart------------

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.json(cart);
  });


  //----------------Find All---------------

// //GET ALL

router.get("/", verifyAdmin, async (req, res) => {
    const carts = await Cart.find();
    res.json(carts);
});



//----------Update------------

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => { 
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedCart);
    });

//---------Delete----------

router.delete("/:id", verifyTokenAndAuthorization, (req, res)=>{
    Cart.findByIdAndDelete(req.params.id, (err, result) =>{
      if (err){
          console.log(err)
      }
      else{
          res.json("Deleted : ");
      }
  });
  })
  
module.exports = router