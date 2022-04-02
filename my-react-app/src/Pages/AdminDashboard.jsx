import '../App.css';
import React from "react";
import Navbars from '../Components/Navbars';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';



function AdminUsers(){
    return(<p>hello</p>)
}
// function AdminOrders(){
    
// }
// function AdminProducts(){
    
// }
// function AdminRevenue(){
    
// }

function AdminDashboard(){
    return(
        <div>
        
            <Navbars />
        <div className='AdminRow'>
            <div className='AdminCol1'>
                <AdminUsers />
            </div>
            {/* <div className='AdminCol2'>
                <AdminOrders />
            </div> */}
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