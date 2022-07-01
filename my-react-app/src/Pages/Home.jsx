import React from "react";
import Navbars from '../Components/Navbars';
import Carousels from '../Components/Carousels';
import CardGroups from '../Components/CardGroups';
import Footer from '../Components/Footer';
import Products from '../Components/Products';
import '../App.css';


const Home=()=>{
    return (
        <div className="Home">
            <Navbars />
            <Carousels />
            <CardGroups />
            <h3>Popular Products</h3>
            <div className='ProductCards'>
            <Products />
                {/* <Cards/><Cards/><Cards/><Cards/> */}
            </div>
            <Footer />
        </div>
    )
}

export default Home;