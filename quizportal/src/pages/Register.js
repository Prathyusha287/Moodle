import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios"
import React,{useState} from "react"
import {Link} from "react-router-dom"
import validator from "validator";
const  Register  = () =>{
    const navigate=useNavigate()
    const [data,setData]=useState(
        {
            name:"",
            userName:"",
            email:"",
            password:"",
           
        }
    )
   const handleChange = (event) =>{
        event.preventDefault()
        setData({
            ...data,
            [event.target.name]:event.target.value
        })
    }
    const  handleClick = (event) =>{
        event.preventDefault()
        if(data.name===""||data.userName===""||data.email===""||data.password===""){
            alert("enter all fields")
        }
        else if(data.name<4){
            alert("Name must have atleat 4 characters")
        }
        else if(data.userName<4){
            alert("UserName must have atleast 4 characters")
        }
        else if(!validator.isEmail(data.email)){
            alert("enter valid email")
        }
        else if(data.password.length<6){
            alert("Your password must have atleast 6 characters")
        }
        else{
            try{
            const response=axios.post("http://localhost:8084/users/",data)
            .then((res)=>{
                if(res.data==="User"){
                    console.log(res.data)
                    alert("User Already Exist with this mail")
                }
                else{
                    navigate("/login")
                }
            })
        }
        catch(err){
            console.log(err)
        }
        }
    }
    return(
        <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={handleClick}>
          <Form.Group className="my-3" controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter First Name"
              value={data.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
  
        
          <Form.Group className="my-3" controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={data.userName}
              name="userName"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="email">
            <Form.Label>Emai</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email address"
              value={data.emai}
              name="email"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group className="my-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              ></Form.Control>
            </InputGroup>
          </Form.Group>
  
         
  
          <Button variant="" className="my-3" type="submit" style={{backgroundColor:" rgb(68 177 49)", color:"white"}}>
            Register
          </Button>
        </Form>
  
        <Row className="py-3">
            <Col>
              Have an Account? <Link to="/login" style={{color:"rgb(240, 86, 148)"}}>Login</Link>
            </Col>
          </Row>
  
      </FormContainer>
      
    )
}
export default Register;