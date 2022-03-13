import React, { useState } from "react";
import Navbars from '../Components/Navbars';

// import Cards from '../Components/Cards';
import Products from '../Components/Products';
import Footer from '../Components/Footer';
import '../App.css';
import {useLocation} from "react-router-dom";
import Form from 'react-bootstrap/Form';

const ProductList=()=>{
    const location = useLocation();
    const cat=location.pathname.split("/")[2];
    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState("Newest");
    // const handleFilters=(event)=>{
    //     const value= event.target.value;
    //     setFilters({
    //        size:value
    //     })
    //     console.log(filters);
    // }
    return (
        <div className="ProductList">
            <Navbars />
            <div className="CatName">
                <h2 >{cat}</h2>
            {/* </div>
            <div className="row1">
            <div className="col1">
                <p>Filter by Size</p>
                <div className='Selector'>
                    <Form.Select aria-label="Select" onChange={handleFilters}>
                        
                        <option value="Small">S</option>
                        <option value="Medium">M</option>
                        <option value="Large">L</option>
                    </Form.Select>
                </div>
            </div> */}
            <div className="col2">
                <p>Sort Products</p>
                <div className='Selector'>
                    <Form.Select aria-label="Select" onChange={(event)=> setSort(event.target.value)}>  
                        <option value="Newest">Newest</option>
                        <option value="Acs">Price (Ascending)</option>
                        <option value="Dec">Price (Descending)</option>
                    </Form.Select>
                </div>
            </div>
            </div>

            <div className='ProductCards'>
                <Products cat={cat} filters={filters} sort={sort} />
            </div>
            <Footer />
        </div>
    )
}

export default ProductList;