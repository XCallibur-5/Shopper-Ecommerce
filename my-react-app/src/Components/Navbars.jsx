
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
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

function Navbars (){
    const quantity = useSelector((state)=>state.cart.quantity);
    return (
        <div className='MyNavbar'>
            <Navbar bg="light" expand={false} fixed="top">
            <Container fluid>
            <Navbar.Brand href="/"><h3>Shopper</h3></Navbar.Brand>
            <div className='SearchingBar'>
            <Form className="d-flex ">
                <FormControl
                type="search"
                placeholder="Search"
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
            
            <div>
                <Link to='/login'>
                    <Button variant="outline-success" className='TopButton'>🎎Login</Button>
                </Link> 
                <Button variant="outline-success" className='TopButton'>🎁Orders</Button>
                <Link to="/cart">
                    <Button variant="outline-success" className='TopButton'>🛒Cart {quantity}</Button>
                </Link>
            </div> 
        </Container>
        </Navbar>
        
        </div>
    )
}
export default Navbars;