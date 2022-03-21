import '../App.css';
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Navbars from '../Components/Navbars';
import Container from 'react-bootstrap/esm/Container';

function NavbarOrder (){
    return (
        <div className='MyAdminNavbar'>
            <Navbar bg="light" expand={false} fixed="top">
            <Navbar.Brand href="#"><h3>         Shopper</h3></Navbar.Brand>
                <div>
                    <Button variant="outline-success" className='TopButton'>🎎Login</Button>
                    <Button variant="outline-success" className='TopButton'>Add Item</Button>
                </div> 
            </Navbar>
        </div>
    )
}

// function AdminUsers(){

// }
// function AdminOrders(){
    
// }
// function AdminProducts(){
    
// }
// function AdminRevenue(){
    
// }

function OrderDashboard(){
    return(
        <div>
        
        < Navbars />
        {/* <div className='AdminRow'>
            <div className='AdminCol1'>
                <AdminUsers />
            </div>
            <div className='AdminCol2'>
                <AdminOrders />
            </div>
        </div>
        <div className='AdminRow'>
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

export default OrderDashboard;