
import '../App.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import { useState } from "react";
import { logout } from "../redux/apiCalls";
import { resetProduct } from "../redux/cartRedux";

function Navbars (){
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [product, setProduct]= useState({});
    const[size, setSize]=useState("");
    const dispatch = useDispatch();
    const quantity = useSelector((state)=>state.cart.quantity);
    const user = useSelector((state)=>state.user.currentUser);
    const Lout=async ()=>{
        //logout(dispatch, { email, password });
        await logout(dispatch, { email,password });
        dispatch(
            resetProduct({...product, quantity, size})
        );
        //console.log(x);
        window.location.href='/';
     }
    function TopButtons (){
        if (user!=null && user.isAdmin===false){
            return(
                <div>
                    <Button variant="outline-danger" className='TopButton' onClick={Lout} >Logout</Button>
                    <Link to={'/order/find/'+user._id}>
                        <Button variant="outline-success" className='TopButton'>🎁Orders</Button>
                    </Link>
                    <Link to="/cart">
                        <Button variant="outline-success" className='TopButton'>🛒Cart {quantity}</Button>
                    </Link>
                </div> 
            )
        }
        if(user!=null && user.isAdmin===true){
            return(
                <div className='MyAdminNavbar'>
                <Button variant="outline-danger" className='TopButton' onClick={Lout} >Logout</Button>
                    <Link to="/admin">
                        <Button variant="outline-success" className='TopButton'>🤵Admin Dashboard</Button>
                    </Link>
                        <Button variant="outline-success" className='TopButton'>Add Item</Button>
                </div>
            )
        }
        else{
            return(<div>

                    <Link to='/login'>
                        <Button variant="outline-success" className='TopButton' >🎎Login</Button>
                    </Link> 
                    {/* <Link to='/order'>
                        <Button variant="outline-success" className='TopButton'>🎁Orders</Button>
                    </Link> */}
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