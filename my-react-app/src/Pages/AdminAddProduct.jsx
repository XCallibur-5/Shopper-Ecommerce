import '../App.css';
import React, { useState } from "react";
import Navbars from '../Components/CommonComponents/Navbars';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userRequest } from "../requestMethods";

function AdminAddProduct(){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");
    const [stock,setStock] = useState("");
    const [category,setCategory] = useState("men");

    const handleClick=async (e)=>{
        e.preventDefault();
       const prod= await {
            title: title,
            desc: description,
            img: image,
            stock: stock,
            categories: category,
            price: price,
        }

        const res = await userRequest.post("/products/createProduct", prod);
        if(res.status==200){
            window.location.href='/'
        }
    };

    return(
        <div>
            <Navbars />
            <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className='AdminRow'>
            <div className='addProduct'>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label autocomplete="off">Item Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title"  autocomplete="off" onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Item Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" onChange={(e)=>setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Item Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image link" onChange={(e)=>setImage(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Set Stock Quantity</Form.Label>
                    <Form.Control type="text" placeholder="Enter Quantity" onChange={(e)=>setStock(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Item Category</Form.Label>
                    <Form.Select aria-label="Select" onChange={(e)=>setCategory(e.target.value)}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </Form.Select>
                </Form.Group>
                <Button variant="outline-success" onClick={handleClick}>
                    Add Product
                </Button>
            </Form>
            </div>
        </div>
    </div> 
    )
     
}

export default AdminAddProduct;