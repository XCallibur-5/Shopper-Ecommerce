import React, { useState,useEffect } from "react";
import Navbars from '../Components/CommonComponents/Navbars';
import Footer from '../Components/CommonComponents/Footer';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import '../App.css';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { userRequest } from "../requestMethods";
import {useSelector,useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartRedux";



function Product(){
    const user = useSelector((state)=>state.user.currentUser);
    const location = useLocation();
    const id=location.pathname.split("/")[2];
    const [product, setProduct]= useState({});
    const[quantity, setQuantity]=useState(1);
    const[size, setSize]=useState("");
    const[rating, setRating]=useState("0");
    const dispatch = useDispatch();
    useEffect(()=>{
        const getProduct = async () => {
              const res = await publicRequest.get("/products/" + id);
              setProduct(res.data);
          };
        getProduct();
    },[id])

    useEffect(()=>{
        const setRat=async ()=>{
            if(product && rating!=="0"){
                const ratRes= await userRequest.post(`/products/rate/${id}`, {rating: rating});
                console.log(ratRes);
            }
        };
        setRat();
    },[rating]);

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
                    <h3 className='ItemStars'>
                    {"⭐".repeat(product.rating)}</h3>
                    
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
                    {(user)?<Button variant="success" className="ToCart" onClick={handleClick}>Add to Cart</Button>:<Button variant="danger" className="ToCart">Please Login</Button>}
                </div>
            </div>
            {(user)?<Container>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Rate the Product</Form.Label>
                        <Form.Select aria-label="Select" onChange={(e)=>setRating(e.target.value)}>
                            <option value="0">Select rating</option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </Form.Select>
                </Form.Group>
                </Col>
                <Col></Col><Col></Col><Col></Col><Col></Col><Col></Col>
            </Row>
        </Container>:<b>Login To Rate</b>}
        

            <Footer />

        </div> 
    )
}
export default Product;