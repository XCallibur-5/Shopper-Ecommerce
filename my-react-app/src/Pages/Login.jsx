import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Navbars from '../Components/Navbars';
import Button from 'react-bootstrap/Button';
import Footer from '../Components/Footer';
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


const Login=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error}= useSelector((state)=> state.user);

    const handleClick=async (e)=>{
        e.preventDefault();
    // console.log(username);
    // console.log(password);

        const x= await login(dispatch, { email, password });
        window.location.href='/'
    };
   
    return(
        <div>
        <Navbars />
            <div className="LoginForm">
            <h4>
                Login
            </h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    This is form text.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="outline-success" onClick={handleClick} disabled={isFetching}>
                    Login
                </Button>
                <a href="/register">  Register Instead.</a>
            </Form>
            
        </div>
        <Footer />
        </div>
        
    )
}


export default Login;