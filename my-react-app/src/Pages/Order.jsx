import '../App.css';
import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Navbars from '../Components/Navbars';
import { userRequest } from "../requestMethods";
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { format } from 'timeago.js';

function OrderDashboard(){
    const[orders, setOrders]=useState([{}])
    const currentUser = useSelector((state) => state.user.currentUser);
    let navigate = useNavigate();
    useEffect(() => {
        const makeRequest = async ()=>{
            const res = await userRequest.get(`/orders/find/${currentUser._id}`);
            console.log(res);
            await setOrders(res.data);
            console.log(currentUser)
        }
        makeRequest();
    },[currentUser]);
    //console.log(orders[0].products);
    return(
        <div>
        < Navbars />

        <br/><br/><br/><br/><br/><br/>
        {(orders.length!==0)?<div>
                {orders.map((item)=>(
                <div className='CartCard'>
                        <div className='CartDescription'>
                            <h6> Order Id:- {item._id} </h6>
                            <p>Address:- {item.address} </p>
                            <p><b>Ordered:-</b>{format(item.updatedAt, 'en_US')}</p>
                            <div className='CartInput'>
                            <p><b>Price :-</b> ₹ {item.amount}</p>
                            <Button variant="outline-danger" type='submit' value={item._id} onClick={()=>{navigate(`/orders/${item._id}`)}}>
                          See Detail
                        </Button>
                        </div> 
                        </div>
                    <hr /> 
                </div>         
            ))}</div>:<div className='CartCard'>
                        <div className='CartDescription'>
                            <h6> Order Id:- No orders available </h6>
                            <p>Consider Using services from us. </p>
                            <div className='CartInput'>
                            
                        </div> 
                        </div>
                    <hr /> 
                </div>  
            
        }
    </div> 
    )  
}

export default OrderDashboard;