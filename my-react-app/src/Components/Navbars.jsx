
import '../App.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { login } from "../redux/apiCalls";

function Navbars (){
    // const [email,setEmail] = useState(null);
    // const [password,setPassword] = useState(null);
    // const dispatch = useDispatch();
    // const { isFetching, error}= useSelector((state)=> state.user);
    

    const quantity = useSelector((state)=>state.cart.quantity);
    const user = useSelector((state)=>state.user.currentUser);
    const Lout=async ()=>{
        //login(dispatch, { email, password });
        const x =await userRequest.post("/auth/logout");
        console.log(x);
     }
    function TopButtons (){
        if (user!=null){
            return(
                <div>
                    <Button variant="outline-danger" className='TopButton' onClick={Lout} >Logout</Button>
                    <Button variant="outline-success" className='TopButton'>🎁Orders</Button>
                    <Link to="/cart">
                        <Button variant="outline-success" className='TopButton'>🛒Cart {quantity}</Button>
                    </Link>
                </div> 
            )
        }else{
            return(<div>
    
                    <Link to='/login'>
                        <Button variant="outline-success" className='TopButton' >🎎Login</Button>
                    </Link> 
                    <Button variant="outline-success" className='TopButton'>🎁Orders</Button>
                    <Link to="/cart">
                        <Button variant="outline-success" className='TopButton'>🛒Cart {quantity}</Button>
                    </Link>
                </div> )
        }
    }

    return (
        <div className='MyNavbar'>
            <Navbar bg="light" expand={false} fixed="top">
            <Container fluid>
            <Navbar.Brand href="/"><h3>Shopper</h3></Navbar.Brand>
            <div className='SearchingBar'>
            <Form className="d-flex ">
                <FormControl
                type="search"
                placeholder="Feature under construction"
                className="SearchArea"
                aria-label="Search"
                />
                <Button variant="outline-success">🔍</Button>
            </Form>
            </div>
            <div className='SearchDropdown'>
            <Dropdown>
                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                    🔍
                </Dropdown.Toggle>
                <Dropdown.Menu>
                
                <Form className="d-flex SearchDropdownMenu">
                <FormControl
                type="search"
                placeholder="Search for a New You"
                className="SearchArea"
                aria-label="Search"
                />
                <Button variant="outline-success">🔍</Button>
            </Form>        
                </Dropdown.Menu>
            </Dropdown>
            </div>

            < TopButtons />  
        </Container>
        </Navbar>
        </div>
    )
}
export default Navbars;