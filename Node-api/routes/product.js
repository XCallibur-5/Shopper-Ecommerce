const Product = require("../models/Product");
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken")

//----------CREATE------------

router.post('/createProduct', verifyAdmin, async (req,res)=>{
    const createdProduct = new Product(req.body);
    const savedProduct = await createdProduct.save();
    res.json(savedProduct);
})

//--------------Rating```````
router.post('/rate/:id', async (req,res)=>{
  if(req.params.id){
    const foundProduct = await Product.findById(req.params.id);
    let k = await foundProduct.rating;
    let l = await foundProduct.ratingNumber;
    l=await l+1
    let rat = await (Math.round((k+parseInt(req.body.rating))/l));
    const doc = await Product.findByIdAndUpdate(foundProduct._id,
      { rating: rat ,
       ratingNumber: l },
      { new: true }
    )
    res.json(foundProduct);
  }
})

//---------READ-------------

router.get('/:id', async (req,res)=>{
    const foundProduct = await Product.findById(req.params.id);
    res.json(foundProduct);
})

  //----------------Find All---------------
  //need to add feature to tckle filters....

  router.get("/",async (req, res)=>{
  const qNew = req.query.new;
  const qCategory = req.query.category;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }
    else {
      products = await Product.find();
    }
    res.json(products);
  })



//----------Update------------

router.put("/:id", verifyAdmin, async (req, res) => { 
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    });

//---------Delete----------

router.delete("/:id", verifyAdmin, (req, res)=>{
    Product.findByIdAndDelete(req.params.id, (err, result) =>{
      if (err){
          console.log(err)
      }
      else{
          res.json("Deleted : ");
      }
  });
  })
  
module.exports = router