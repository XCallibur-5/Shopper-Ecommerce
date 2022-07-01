import '../App.css';
import React, { useState,useEffect } from "react";
import Navbars from '../Components/Navbars';
import Button from 'react-bootstrap/Button';
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { format } from 'timeago.js';
import Form from 'react-bootstrap/Form';

function AdminUsers(){
    
    const[users, setUsers]=useState([{}]);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const makeRequest = async ()=>{
            const res = await userRequest.get(`/orders/users`);
            setUsers(res.data);
        };makeRequest();
    },[currentUser]);

    return(
        <div>
        <br/>
        <h2>All Users</h2>
        
            {users.map((item)=>(
            <div className='CartCard'>
                    <div className='CartDescription'>
                        <h6> User id:- {item._id} </h6>
                        <p><b>Email:-</b>{item.email}</p>
                        <div className='CartInput'>
                        <p><b>User Name:-</b> {item.username} </p>
                        {item.isAdmin ? <Button variant="outline-danger" type='submit' value={item._id}>
                          See Detail
                        </Button>: <div><Button variant="outline-danger" type='submit' value={item._id}>
                          See Detail
                        </Button>
                        <Button variant="outline-danger" type='submit' value={item._id}>
                          Make Admin
                        </Button></div>}
                    </div> 
                    </div>
                <hr /> 
            </div>         
        ))}
        </div>
        
    )
}
function AdminOrders(){
    const[orders, setOrders]=useState([{}]);
    const currentUser = useSelector((state) => state.user.currentUser);
    let navigate = useNavigate();
    useEffect(() => {
        const makeRequest = async ()=>{
            const res = await userRequest.get(`/orders/`);
            setOrders(res.data);
        };makeRequest();
    },[currentUser]);

    return(
        <div>

        <br/><br/><br/><br/><br/><br/>
        <h2>All Orders</h2>
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
        ))}
        </div>
        
    )
}
// function AdminProducts(){
    
// }
// function AdminRevenue(){
    
// }

function AdminDashboard(){
    const[criteria, setCriteria]=useState();
    const currentUser = useSelector((state) => state.user.currentUser);
    return(
        <div>
            <Navbars />
            <br/><br/><br/><br/><br/>
            <Form.Select aria-label="What you want to see" onChange={(e)=>{setCriteria(e.target.value)}}>
                <option value="0">Select Option</option>
                <option value="1">All Users</option>
                <option value="2">All Orders</option>
            </Form.Select>
        <div className='AdminRow'>
            <div className='AdminCol1'>
                {(criteria==='1')?<AdminUsers />:<p></p>}
            </div>
            <div className='AdminCol2'>
                {(criteria==='2')?<AdminOrders />:<p></p>}
                
            </div>
        </div>
        {/* <div className='AdminRow'>
            <div className='AdminCol1'>
                <AdminProducts />
            </div>
            <div className='AdminCol2'>
                <AdminRevenue />
            </div>
        </div> */}
    </div> 
    )
     
}

export default AdminDashboard;