import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import  "./AdminEditQuestion.css"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditQuestion = () => {
  const navigate = useNavigate();
  const {id}  = useParams()
  

  const[data,setData] = useState(
        {
            content:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            answer:"",
            
        }
    )

    const getQuestion = async() => {
      await axios.get(`http://localhost:8082/question/${id}`,data)
      .then((res) =>{
          setData(res.data)
      })
  }
  useEffect(()=>{
      getQuestion();

  },[])
  
  
  const handleChange = (event) =>{
    setData(
        {
            ...data,
            [event.target.name]:event.target.value
        }
    )
}

const handleSubmit = (event) =>{
  event.preventDefault()
  axios.put(`http://localhost:8082/question/${id}`,data)
  .then(response=> {
      console.log(response.data);
      swal({
        title: "Success",
        text: "Question edited successfully",
        icon: "success",
      }).then(() => {
        navigate("/adminQuizzes/");
      });
    })
    .catch(error=> {
      console.log(error);
      swal("Error", "Failed to edit question", "error");
    });
}


  return (
    <div className="adminEditQuestion__container">
      <div className="adminEditQuestion__sidebar">
        <Sidebar />
      </div>
      <div className="adminEditQuestion__content">
        <FormContainer>
          <h2>Update Question</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3" controlId="content">
              <Form.Label>Question</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="3"
                type="text"
                placeholder="Enter Question Content"
                name="content"
                value={data.content}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option1">
              <Form.Label>Option 1</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Enter Option 1"
                name="option1"
                value={data.option1}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option2">
              <Form.Label>Option 2</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Enter Option 2"
                name="option2"
                value={data.option2}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option3">
              <Form.Label>Option 3</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Enter Option 3"
                name="option3"
                value={data.option3}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option4">
              <Form.Label>Option 4</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Enter Option 4"
                name="option4"
                value={data.option4}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <div className="my-3">
              <label htmlFor="answer-select">Choose Correct Option:</label>
              <Form.Select
                aria-label="Choose Correct Option"
                id="answer-select"
                value={data.answer}
                name="answer"
                onChange={handleChange}
              >
                <option value="n/a">Choose Option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
          
              </Form.Select>
            </div>
            <Button
              className="my-5 adminEditQuestion__content--button"
              type="submit"
              variant="primary"
            >
              Edit
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminEditQuestion;
