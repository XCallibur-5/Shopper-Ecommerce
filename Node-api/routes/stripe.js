const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require('stripe')('sk_test_51KfEtLSJFjixEHzmgJvIImu7xdDTgBm6ye9q9jVN4VqOSHcyYOkO57nUBrIqAWY0zRf1crIMfFdGgfWV2dcDKVMt006wmujYcm');
console.log(KEY);
router.post("/payment", async (req, res) => {
  console.log(req.body);
  
  await stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );


});

// router.post("/payments", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });


module.exports = router;
