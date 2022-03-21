const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require('stripe')('sk_test_51KfEtLSJFjixEHzmgJvIImu7xdDTgBm6ye9q9jVN4VqOSHcyYOkO57nUBrIqAWY0zRf1crIMfFdGgfWV2dcDKVMt006wmujYcm');
console.log(KEY);
router.post("/payment", (req, res) => {
  //console.log(req.body);
  
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.json(stripeErr);
      } else {
        
        res.json(stripeRes);
      }
    }
  );
});

module.exports = router;
