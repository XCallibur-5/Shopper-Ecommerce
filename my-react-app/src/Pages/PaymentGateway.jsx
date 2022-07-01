import { userRequest } from "../requestMethods";
export default async function displayRazorpay(Orderer, money) {
    const data = await userRequest.post("/orders/razorPay", {money:money})

  console.log(data)
  
    console.log(data);
  
    const options = {
      key: 'rzp_test_0amWP6SNmGWvw1',
      currency: data.data.currency,
      amount: data.data.amount,
      name: "Learn Code Online",
      description: "Wallet Transaction",
      order_id: data.data.id,
        handler: await Orderer
        }
  
    const paymentObject = await new window.Razorpay(options);
    paymentObject.open();
  }