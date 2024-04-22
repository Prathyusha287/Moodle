import { useNavigate ,Link} from "react-router-dom"
import React,{useState} from 'react'
import axios from 'axios'
import FormContainer from "../components/FormContainer";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const Login=()=>{
    const navigate=useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClick=(event)=>{
        event.preventDefault()
    
            axios.post("http://localhost:8084/users/login",null,{params:{userName,password}})
            .then((res)=>
            {
                console.log(res.data);
                if(res.data==="Admin"){
                    
                    localStorage.setItem("admin",res.data)
                    navigate("/adminQuizzes")
                   
                }

                else if(res.data==="User"){
                    localStorage.setItem("user",res.data)
                    navigate("/quizzes")
                   
                    
                }
                else if(res.data==="Not"){
                    alert("Invalid credentials")
                }
            })
        
    }
    return(
        
             <FormContainer>
              <h1>MOODLE-A QUIZ PORTAL</h1>
              <br></br>
      <h1>Log In</h1>
      <Form onSubmit={handleClick}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={userName}
            name="userName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            
          </InputGroup>
        </Form.Group>

        <Button
          variant=""
          className="my-3"
          type="submit"
          style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
        >
          Login
        </Button>
      </Form>

     
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link to="/register" style={{ color: " rgb(68 177 49)" }}>
              Register
            </Link>
          </Col>
        </Row>
      
    </FormContainer>
            
        

       
    )
}
export default Login;