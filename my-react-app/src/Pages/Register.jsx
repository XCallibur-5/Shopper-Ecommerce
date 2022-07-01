import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Footer from '../Components/CommonComponents/Footer';
import Navbars from '../Components/CommonComponents/Navbars';
import { publicRequest } from "../requestMethods";


function Register(){
    const [username,setuserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const Ruser ={
        username: username,
        email: email,
        password: password,
    }
    console.log(Ruser);
    const regis =async (e)=>{
        e.preventDefault();
        const k = await publicRequest.post("/auth/registration", Ruser);
        window.location.href='/'
    }
    
    return(
        <div>
        <Navbars />
            <div className="LoginForm">
            <h4>
                Register to be a Shopper.
            </h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="test" placeholder="Enter Your Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="test" placeholder="Enter Username" onChange={(e)=>setuserName(e.target.value)} />
                </Form.Group>
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
                
                <Button variant="outline-success" type="submit" onClick={regis}>
                    Register         
                </Button>

            </Form>
            
        </div>
        <Footer />
        </div>
    )
}


export default Register;