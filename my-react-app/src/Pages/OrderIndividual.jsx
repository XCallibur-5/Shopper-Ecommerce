import '../App.css';
import React, { useState,useEffect } from "react";
import Navbars from '../Components/Navbars';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { userRequest } from "../requestMethods";
import {useSelector,useDispatch} from 'react-redux';
import { format } from 'timeago.js';
import { useParams } from 'react-router-dom';

function AdminOrders(){
    const { id } = useParams();
    const[order, setOrder]=useState();
    const[products, setProducts]=useState([{}]);
    const currentUser = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        const makeRequest = async ()=>{
            if(id){
                const res = await userRequest.get(`/orders/findOne/${id}/${currentUser._id}`);
                console.log(res)
                setOrder(res.data);
            }  
        };makeRequest();
    },[id]);

    useEffect(()=>{
        const pro = async ()=>{
            order?.products?.map(async (x)=>{
                console.log(x.quantity)
                let resTemp = await userRequest.get(`/products/${x.productId}`)
                resTemp.qua= await x.quantity
                console.log(resTemp)
                await setProducts(oldArray => [...oldArray, resTemp])
                console.log(products)
            })
        }; pro()
    }, [order, id, currentUser])

    const handleClick=async ()=>{
        const res = await userRequest.get(`/orders/mark/${id}`);
    }

    return(
        <div>

        <br/><br/>
        <h2>Order Id-{id}</h2>

            <div className='CartCard'>
                        <p>Address:- {order?.address} </p>
                        <p>Email:- {order?.email} </p>
                        <p><b>Ordered:-</b>{format(order?.updatedAt, 'en_US')}</p>
                        <div className='CartInput'>
                        <p><b>Price :-</b> ₹ {order?.amount}</p>
                        <h4>Order Items</h4>
                        {(currentUser.isAdmin && order?.status!=='delivered')?<Button variant="outline-danger" onClick={handleClick}>delivered</Button>:<></>}
                        {(order?.status==='delivered')?<Button variant="outline-success">delivered {format(order?.updatedAt, 'en_US')}</Button>:<Button variant="outline-danger">Not yet delivered</Button>}
                        <hr />

                        {products.map((prod, index)=>(
                            (prod.data)?
                            <div className='CartCard' key={index}>
                        <img src={prod.data.img} alt='ProductImage' className='CartImg'/>
                        <div className='CartDescription'>
                            <h4> {prod.data.title} </h4>
                            <span>{prod.data.price}</span><span>x {prod?.qua}</span><span> = </span><span>{(prod.data.price)*(prod?.qua)}</span>
                        </div>

                        <div className='CartInput'>
                        

                        </div>
                    <hr /> 
                  </div>
                              
                            :<p></p>
            ))}
                        
                        
                    </div> 
                    
                    </div>
            </div>
        
    )
}
// function AdminProducts(){
    
// }
// function AdminRevenue(){
    
// }

function AdminDashboard(){
    const currentUser = useSelector((state) => state.user.currentUser);
    return(
        <div>
            <Navbars />
            <br/><br/><br/><br/><br/>
            
            <div className='AdminCol2'>
                <AdminOrders />
            </div>
        </div>

    )
     
}

export default AdminDashboard;