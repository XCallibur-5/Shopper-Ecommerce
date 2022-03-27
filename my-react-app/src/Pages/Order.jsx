import '../App.css';
import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Navbars from '../Components/Navbars';
import Container from 'react-bootstrap/esm/Container';
import { userRequest } from "../requestMethods";
import {useSelector,useDispatch} from 'react-redux';

function OrderDashboard(){
    const[orders, setOrders]=useState([{}])
    const currentUser = useSelector((state) => state.user.currentUser);
    
    const Orders=async()=>{
        const res = await userRequest.get(`/orders/find/${currentUser._id}`);
        setOrders(res.data);
    }
    return(
        <div>
        < Navbars />
        <hr />
        <br />
        <br />
        <br /><br /><br /><br /><br />
        <Button variant="outline-success" type="submit" onClick={Orders}>
            Show Orders
        </Button>
    </div> 
    )
     
}

export default OrderDashboard;