import React from "react";
import Navbars from '../Components/Navbars';
import Footer from '../Components/Footer';
import {useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button'
import '../App.css';


function Cart(){
    const cart= useSelector(state=>state.cart);
    //console.log(cart);
    
    return(
        <div>
            <Navbars />
            <div className="CartDetail">
                <h2>Your Cart</h2>
                <Button variant="outline-success" type="submit">
                    Continue Shopping
                </Button>
                <Button variant="outline-success" type="submit">
                    Proceed to Checkout
                </Button>
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