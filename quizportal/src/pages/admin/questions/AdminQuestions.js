
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Question from '../../../components/Question';
import Sidebar from '../../../components/Sidebar';
import "./AdminQuestions.css"

const AdminQuestions = () => {
    const { quizId } = useParams();
  const navigate = useNavigate();
  const[quiz,setQuiz] = useState([])
  let answers ={}

  const getQuiz = async () =>{
    try{
      await axios.get(`http://localhost:8086/quiz/${quizId}`)
      .then((res) =>{
        console.log(res.data)
        console.log("questions",res.data.questions)
        setQuiz(res.data)

      })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
      getQuiz();
  },[]);
  
  const addNewQuestionHandler = () => {
    navigate(`/adminAddQuestion/${quiz.quizId}`);
  };
 
  
  return (
    <div className="adminQuestions__container">
     < div className="adminQuestions__sidebar">
        <Sidebar />
      </div>
      
    <div className="adminQuestions__content">
      <h2>{quiz.title}</h2>
       
    <Button
          className="adminQuestions__content--button"
          onClick={addNewQuestionHandler}
        >
          Add Question
        </Button>
      {quiz.questions ? (
        quiz.questions.map((q, index) => {
         
          return <Question key={index} number={index + 1} 
          question={q}
          answers={answers}
          isAdmin={true} />;
        })
      ) : (
        <h1>Loading</h1> 
      )}

    </div>


  </div>
   
  );
};

export default AdminQuestions;
