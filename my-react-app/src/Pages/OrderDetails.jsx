import '../App.css';
import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Navbars from '../Components/CommonComponents/Navbars';

import { userRequest } from "../requestMethods";
import {useSelector,useDispatch} from 'react-redux';
import { format } from 'timeago.js';

function OrderDashboard(){
    const[orders, setOrders]=useState([{}])
    const currentUser = useSelector((state) => state.user.currentUser);
    
    useEffect(() => {
        const makeRequest = async ()=>{
            const res = await userRequest.get(`/orders/find/${currentUser._id}`);
            setOrders(res.data);
        };makeRequest();
    },[currentUser]);


    return(
        <div>
        < Navbars />
        <br/><br/><br/><br/><br/><br/>
        {orders.map((item)=>(
                <div className='CartCard'>
                        <div className='CartDescription'>
                            <h6> Order Id:- {item._id} </h6>
                            <p>Address:- {item.address} </p>
                            <p><b>Ordered:-</b>{format(item.updatedAt, 'en_US')}</p>
                            <div className='CartInput'>
                            <p><b>Price :-</b> ₹ {item.amount}</p>
                            <Button variant="outline-danger" type='submit' value={item._id}>
                              See Detail
                            </Button>
                        </div> 
                        </div>
                    <hr /> 
                </div>         
            ))}
    </div> 
    )
     
}

export default OrderDashboard;