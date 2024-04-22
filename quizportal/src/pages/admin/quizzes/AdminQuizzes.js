import React, { useEffect, useState } from "react";
import "./AdminQuizzes.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row,Button, ListGroup } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import swal from "sweetalert";

const AdminQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(()=>
  {
      fetch(`http://localhost:8086/quiz/`,{
          method:"GET"
      }).then((res)=>(res=res.json()))
        .then((res)=>
        {
          if(res.length>0){
              console.log(res)
              setQuizzes(res);
          }  
        })
  },[])

  const addNewQuizHandler = () => {
    navigate("/adminAddQuiz");
  };

   const deleteQuizHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this quiz!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8086/quiz/${id}`)
        .then(() => {
          swal(
            "Quiz Deleted!",
            `Quiz with id ${id}, successfully deleted`,
            "success"
          );
        })
        .catch((error) => {
          console.error("Error deleting question:", error);
          swal(
            "Quiz Not Deleted!",
            `Quiz with id ${id} not deleted`,
            "error"
          );
        });
    
    }
    });

  };
       
  const editQuizHandler = (quizId) => {
    navigate(`/adminEditQuiz/${quizId}`);
  };
  const questionsHandler = ( quizId) => {
    navigate(`/adminQuestions/${quizId}`);
  };

  
   
  const QuizList = (quiz,index) =>{       
      return (
        <ListGroup
          className="adminQuizzes__content--quizzesList"
          key={index}
        >
          <ListGroup.Item className="align-items-start" action>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{quiz.title}</div>
      
              {<p className="my-3">{quiz.description}</p>}

              <div className="adminQuizzes__content--ButtonsList">
               <div
                            onClick={() =>
                              questionsHandler( quiz.quizId)
                            }
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              height: "35px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              color: "white",
                              backgroundColor: "rgb(68 177 49)",
                              margin: "0px 4px",
                            }}
                          >{`Questions`}</div>
                <div
                  style={{
                    border: "1px solid grey",
                    width: "100px",
                    padding: "1px",
                    textAlign: "center",
                    borderRadius: "5px",
                    height: "35px",
                    margin: "0px 4px",
                  }}
                >{`Marks : ${quiz.maxMarks}`}</div>
                <div
                  style={{
                    border: "1px solid grey",
                    width: "100px",
                    padding: "1px",
                    textAlign: "center",
                    borderRadius: "5px",
                    height: "35px",
                    margin: "0px 4px",
                  }}
                >{`${quiz.numberOfQuestions} Questions`}</div>
                <div
                  onClick={() =>
                    editQuizHandler( quiz.quizId)
                  }
                  style={{
                    border: "1px solid grey",
                    color: "white",
                    backgroundColor: "rgb(68 177 49)",
                    width: "100px",
                    padding: "1px",
                    textAlign: "center",
                    borderRadius: "5px",
                    height: "35px",
                    margin: "0px 4px",
                  }}
                >{`Edit`}</div>
                <div
                  onClick={() => deleteQuizHandler(quiz.quizId)}
                  style={{
                    border: "1px solid grey",
                    color: "white",
                    backgroundColor: "#ff0b0bdb",
                    width: "100px",
                    padding: "2px",
                    textAlign: "center",
                    borderRadius: "5px",
                    height: "35px",
                    margin: "0px 4px",
                  }}
                >{`Delete`}</div>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      );
  
}
 
  return (
    <div className="adminQuizzes__container">
      <div className="adminQuizzes__sidebar">
        <Sidebar />
      </div>
      <div className="adminQuizzes__content">
        <h2>Quizzes</h2>
        {quizzes ? (
          quizzes.length === 0 ? (
            <h2>No quizzes are present. Try adding some quizzes.</h2>
          ) : (
            <Row>
                {quizzes.map((q) => (
                  <QuizList key={q.quizId} {...q} />
                ))}
              </Row>
          )
        ) : (
         <h1>Loading</h1>
        )}
        <Button
          variant="primary"
          className="adminQuizzes__content--button"
          onClick={addNewQuizHandler}
        >
          Add Quiz
        </Button>
      </div>
    </div>
  );
};

export default AdminQuizzes;
