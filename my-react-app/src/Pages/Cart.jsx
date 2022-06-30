import React from "react";
import Navbars from '../Components/Navbars';
import Footer from '../Components/Footer';
import {useSelector,useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css';

import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { addProduct,resetProduct,removeProduct } from "../redux/cartRedux";
import displayRazorpay from "./PaymentGateway";


//console.log(KEY);

const Cart=()=>{
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [mark, setMark] = useState(false);
    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const[size, setSize]=useState("");
    const[number, setNumber]=useState(0);
    const[qua, setQua]=useState(0);
    const[money, setMoney]=useState(0);
    const currentUser = useSelector((state) => state.user.currentUser);
    const quantity = useSelector((state)=>state.cart.quantity);

    const [product, setProduct]= useState({});
    //console.log(product);
    const cart= useSelector((state)=>state.cart);
    const [message, setMessage] = useState("");


  useEffect(() => {
    const test=async()=>{
      await setProduct(cart);
      console.log(product);
      setMessage(cart.total)
    };test()
  },[cart])
  
  useEffect(() => {
    //Check to see if this is a redirect back from Checkout
    if(mark){
      dispatch(
        removeProduct({number, qua, money, size}) 
    );
    }
  console.log(cart);
  }, [number]);

      const Orderer=async()=>{
        console.log('hi ordered')
        if(address!=="" && email!==""){
          try {
            const res = await userRequest.post("/orders", {
              userId: currentUser._id,
              products: cart.products.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
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
      }
      const payment= async()=>{
        console.log(message);
        const result= await displayRazorpay(Orderer, message);
        console.log(result);
      }

    let x=0;

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
                    <Form.Control type="test" placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
                </Form.Group>
            </Form>
            </div> 
                  
            {
              cart?.products?.map((prod, index)=>(
                <div className='CartCard'>
                        <img src={prod.img} alt='ProductImage' className='CartImg'/>
                        <div className='CartDescription'>
                            <h4> {prod.title} </h4>
                            <p>Size:- {prod.size} </p>
                            <p>Quantity :- {prod.quantity}</p>
                        </div>

                        <div className='CartInput'>
                            <p> </p>
                            <p>₹ {prod.price*prod.quantity}</p>
                            <Button variant="outline-danger" type="button" value={{idx:index, quan:prod.quantity}} onClick={(e)=>{setNumber(index); setMark(true); setQua(prod.quantity); setMoney((prod.quantity)*(prod.price))}}>
                              Remove
                            </Button>
                        </div>
                    <hr /> 
                  </div>         
            ))}
            </div>
            
            
            <div className="OrderSummary">
                <h3>Order Summary</h3>
                <p>Total Order :- {cart.products?.length}</p>
                <p>Toatl Price :- ₹{cart.total}</p>
                <p>Discount    :- 0</p>
                <p>Net Payable :- ₹{cart.total}</p>
                <Button variant="outline-success" type="button"
          onClick={payment}>Buy Now</Button>
            </div>
            <Footer />
        </div>
        
    )
}



export default Cart;