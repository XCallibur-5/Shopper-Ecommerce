
const express = require('express');
const router = express.Router();
const User = require ('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//---------------------------------------REGISTERING NEW USER-----------------------------

router.post('/registration', async (req,res)=>{
    const NewUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    const uno=await NewUser.save();
     res.send("User created Successfully.");
})

//---------------------------------   -LOGIN-      --------------------------

router.post("/login", (req,res)=>{
    User.findOne({email:req.body.email}, (err,result)=>{
        const passcheck=req.body.password;
        if (CryptoJS.AES.decrypt(result.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)===passcheck){
//--------------------------------JSON WEBTOKEN CREATION------------

            const accessToken = jwt.sign({
                id:result._id,
                isAdmin:result.isAdmin,
            }, process.env.JWT_SEC,
                {expiresIn:"4d"}
            );

            {
                // console.log(accessToken);
                /*checking what comes upon verifying JWT*/
                // var decoded = jwt.verify(accessToken, process.env.JWT_SEC);
                // console.log(decoded);
                //console.log(accessToken);
            }
            
            const {password,...others}=result._doc;
            res.json({...others, accessToken});
        }else{
            return res.json('Cannot Login Check email/password')
        }
    })
})
module.exports=router;