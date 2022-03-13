const User = require("../models/User");
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken")

//----------Update------------

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // in case user changes passward it is first encrypted then only passed for updation
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    } 
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    });

//---------Delete----------
  router.delete("/:id", verifyTokenAndAuthorization, (req, res)=>{
    User.findByIdAndDelete(req.params.id, (err, result) =>{
      if (err){
          console.log(err)
      }
      else{
          res.json("Deleted : ", result);
      }
  });
  })

  //----------READ-----------
  router.get("find/:id", verifyAdmin, (req, res)=>{
    User.findById(req.params.id, (err,result)=>{
      if(!err){
        res.json(result);
      }else{
        res.json(err);
      }
    });
  })

  //----------------Find All---------------
  router.get("/allUsers", verifyAdmin,async (req, res)=>{
    const users= await User.find();
    res.json(users);
  })

module.exports = router