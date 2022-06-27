const router = require("express").Router();
const KEY = process.env.STRIPE_KEY

// router.post("/payment", async (req, res) => {
//   console.log(req.body);
  
//   await stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

/////////////////////////////////////////////////



// This is your test secret API key.



router.post("/payment", async (req, res) => {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



// router.post("/payment", async (req, res) => {
//   console.log(req.body);
  
//   await stripe.charges.create(
//     {
//       ////////////--------
//       source: req.body.tokenId,
//       //-----------
//       amount: 
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });
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