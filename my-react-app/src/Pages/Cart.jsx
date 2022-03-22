import React from "react";
import Navbars from '../Components/Navbars';
import Footer from '../Components/Footer';
import {useSelector,useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css';

import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { addProduct,resetProduct } from "../redux/cartRedux";



const KEY = 'pk_test_51KfEtLSJFjixEHzm2Txr1JedqvdtlyfurVhLcwbaCUxlQwMXGg30Gu2JGjmTkDbT56NbDrpBqtRfYtlQxTcklUOB00rG9ZjieA'
//console.log(KEY);

const Cart=()=>{
    const cart= useSelector((state)=>state.cart);
    const dispatch = useDispatch();
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
              amount:cart.total,
            });
            console.log(res);
            navigate("/success", {
              stripeData: res.data,
              products: cart, });
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, cart ,navigate]);

    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const [product, setProduct]= useState({});
    const[size, setSize]=useState("");
    const currentUser = useSelector((state) => state.user.currentUser);
    const quantity = useSelector((state)=>state.cart.quantity);


      const Orderer=async()=>{
        try {
          const res = await userRequest.post("/orders", {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: address,
          });
        } catch {}
        dispatch(
          resetProduct({...product, quantity, size})
      );
        window.location.href='/';
      }



    
    return(
        <div>
            <Navbars />
            <div className="CartDetail">
                <h2>Your Cart</h2>
                <Button variant="outline-success" type="submit">
                    Continue Shopping
                </Button>
            </div>
            

            <div className="CartItems">
            <div className="LoginForm">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="test" placeholder="Address"  onChange={(e)=>setAddress(e.target.value)}/>
                </Form.Group>
                <Button variant="outline-success" type="submit" onClick={Orderer}>
                Pay On Delvery ₹{cart.total}    
                </Button>
            </Form>
            </div>
                    
                    
                    
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
                
                {/* <StripeCheckout
              name="Shopper"
              // image="Shopper"
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
            </StripeCheckout> */}
            
            </div>
            <Footer />
        </div>
        
    )
}

export default Cart;