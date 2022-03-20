import React from "react";
import Navbars from '../Components/Navbars';
import Footer from '../Components/Footer';
import {useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button'
import '../App.css';

import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";


const KEY = 'pk_test_51KfEtLSJFjixEHzm2Txr1JedqvdtlyfurVhLcwbaCUxlQwMXGg30Gu2JGjmTkDbT56NbDrpBqtRfYtlQxTcklUOB00rG9ZjieA';
//console.log(KEY);

function Cart(){
    const cart= useSelector(state=>state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    //console.log(cart);
    const navigate = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
      };

      useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await userRequest.post("/checkout/payment", {
              tokenId: stripeToken.id,
              amount: cart.total,
            });
            navigate.push("/success", {
              stripeData: res.data,
              products: cart, });
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, cart,navigate]);


    
    return(
        <div>
            <Navbars />
            <div className="CartDetail">
                <h2>Your Cart</h2>
                <Button variant="outline-success" type="submit">
                    Continue Shopping
                </Button>

                <StripeCheckout
              name="Shopper"
              image="Shopper"
              currency="INR"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button variant="outline-success">
                    Proceed to Checkout
                </Button>
            </StripeCheckout>

                
            </div>

            <div className="CartItems">
            
                    
                    
                    
            {cart.products.map((product)=>(
                <div className='CartCard'>
                        <img src={product.img} alt='ProductImage' className='CartImg'/>
                        <div className='CartDescription'>
                            <h4> {product.title} </h4>
                            <p>Size:- {product.size} </p>
                            <p>Quantity :- {product.quantity}</p>
                        </div>

                        <div className='CartInput'>
                            <p> </p>
                            <p>₹ {product.price*product.quantity}</p>
                            <a href='.'>Remove</a>
                        </div>
                    <hr /> 
                    </div>         
            ))}
            </div>
            
            <div className="OrderSummary">
                <h3>Order Summary</h3>
                <p>Total Order :- {cart.products.length}</p>
                <p>Toatl Price :- ₹{cart.total}</p>
                <p>Discount    :- 0</p>
                <p>Net Payable :- ₹{cart.total}</p>
            </div>
            <Footer />
        </div>
        
    )
}

export default Cart;