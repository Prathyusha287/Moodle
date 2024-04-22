import axios from "axios"
import React,{useEffect,useState} from "react"
import { useNavigate,useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar"
import FormContainer from "../../../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert"
import "./AdminEditQuiz.css"
const  AdminEditQuiz= ()=>{

    const[data,setData] = useState(
        {
            title:"",
            description:"",
            maxMarks:"",
            numberOfQuestions:""
        }
    )

    const navigate  = useNavigate()
    const { id} = useParams()

    const getQuiz = async() => {
        await axios.get(`http://localhost:8086/quiz/${id}`,data)
        .then((res) =>{
            setData(res.data)
        })
    }
    useEffect(()=>{
        getQuiz();

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
        axios.put(`http://localhost:8086/quiz/${id}`,data)
        .then(response=> {
            console.log(response.data);
            swal({
              title: "Success",
              text: "Quiz edited successfully",
              icon: "success",
            }).then(() => {
              navigate("/adminQuizzes");
            });
          })
          .catch(error=> {
            console.log(error);
            swal("Error", "Failed to edit quiz", "error");
          });
    }

    return(
        <div className="adminUpdateQuiz__container">
        <div className="adminUpdateQuiz__sidebar">
          <Sidebar />
        </div>
        <div className="adminUpdateQuiz__content">
          <FormContainer>
            <h2>Update Quiz</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Quiz Title"
                  value={data.title}
                  name="title"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group className="my-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  style={{ textAlign: "top" }}
                  as="textarea"
                  rows="3"
                  type="text"
                  placeholder="Enter Quiz Description"
                  value={data.description}
                  name="description"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group className="my-3" controlId="maxMarks">
                <Form.Label>Maximum Marks</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Maximum Marks"
                  value={data.maxMarks}
                  name="maxMarks"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group className="my-3" controlId="numberOfQuestions">
                <Form.Label>Number of Questions</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Questions"
                  value={data.numberOfQuestions}
                  name="numberOfQuestions"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
             <Button
                className="my-5 adminUpdateQuiz__content--button"
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
  
export default AdminEditQuiz;