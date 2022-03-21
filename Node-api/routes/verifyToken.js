const jwt = require("jsonwebtoken");
const Blacklist = require ('../models/Blacklist');
const verifyToken = (req, res, next) => {

  Blacklist.findOne({token:req.headers.token }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      if(docs!=null){
        return res.json("You are not authenticated!");
      }else{
        const authHeader = req.headers.token;
        if (authHeader) {
          const token = authHeader;
          jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.json("Token is not valid!");
            req.user = user;
            next();
          });
        } else {
          return res.json("You are not authenticated!");
        }
      }
    }
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
 // console.log(req.headers.token);
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.json("You are not alowed to do that!");
    }
  });
};

const verifyAdmin = (req,res,next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.json("You are not alowed to do that as you are not the admin!");
    }
  });
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyAdmin}