import React from "react";
import Navbars from '../Components/Navbars';
import Footer from '../Components/Footer';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import '../App.css';
import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from 'react-redux';

function Product(){
    const location = useLocation();
    const id=location.pathname.split("/")[2];
    const [product, setProduct]= useState({});
    const[quantity, setQuantity]=useState(1);
    const[size, setSize]=useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        const getProduct = async () => {
              const res = await publicRequest.get("/products/" + id);
              setProduct(res.data);
          };
        getProduct();
    },[id])

    const handleClick=()=>{
        dispatch(
            addProduct({...product, quantity, size})
        );
    }
    
    return(
        <div>
            <Navbars />
            <div className='ItemCard'>
                <div className="ProductImage">
                    <img src={product.img} alt='productimage' className='ItemImg' />
                </div>
                <div className="ProductDetail">
                    <h2>{product.title}</h2>
                    <h3 className='ItemStars'>⭐⭐⭐</h3>
                    
                    <p className='ItemDescription'>{product.desc}</p>
                    <h3 className='ItemPrice'> ₹ {product.price}</h3>
                    <div className="row2">
                        <div className="col3">
                        <div className='Selector'>
                            <span>Quantity :-</span>
                            <Form.Select aria-label="Select" onChange={(event)=> setQuantity(event.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </div>
                        </div>
                        <div className="col4">
                        <div className='Selector'>
                            <span>Select Size :-</span>
                            <Form.Select aria-label="Select" onChange={(event)=> setSize(event.target.value)}>
                                <option>Size Select</option>
                                <option value="Small">S</option>
                                <option value="Medium">M</option>
                                <option value="Large">L</option>
                            </Form.Select>
                        </div>
                        </div>
                    </div>
                    <Button variant="success" className="ToCart" onClick={handleClick}>Add to Cart</Button>
                </div>
                
            </div>
            <Footer />
        </div> 
    )
}
export default Product;