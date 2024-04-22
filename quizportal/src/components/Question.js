import React, { useState } from "react";
import {InputGroup} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./Question.css";
import axios from "axios";

const Question = ({number ,answers , question , isAdmin = false}) =>{
    const navigate = useNavigate();
  const answer = question.answer;
  
  const saveAnswer = (quesId, ans) => {
    const newAns = {};
    newAns[quesId] = ans;
    let answers = JSON.parse(localStorage.getItem("answers"));
    if (answers) {
      answers[quesId] = ans;
      localStorage.setItem("answers", JSON.stringify(answers));
    } else {
      localStorage.setItem("answers", JSON.stringify(newAns));
    }
  };
   
    const updateQuestionHandler = (ques) =>{
        navigate( `/adminEditQuestion/${ques.quesId}`);

    };
   
    const deleteQuestionHandler = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this quiz!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8082/question/${id}`)
          .then(() => {
            swal(
              "Question Deleted!",
              `Question with id ${id}, successfully deleted`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting question:", error);
            swal(
              "Question Not Deleted!",
              `Question with id ${id} not deleted`,
              "error"
            );
          });
      }
      });
  
    };
    return(
        <div className="question__container">
            <div className= "question__content">
                {number + ". " + question.content}
            </div>
            <div className="question__options">
                <InputGroup
                onChange = {(e) => {
                  saveAnswer(question.quesId, e.target.value);
                  
                }}
                >
                <div className ="question__options--2">
                    <div className = "question__options--optionDiv">
                        <InputGroup.Radio
                            value={"option1"}
                            name={number}
                            aria-label="option 1"
                          
                        />
                        <span className="question__options--optionText">
                            {question.option1}
                        </span>
                    </div>
                    <div className="question__options--optionDiv">
                        <InputGroup.Radio
                            value={"option2"}
                            name={number}
                            aria-label="option 2"
                            
                        />
                        <span className="question__options--optionText">
                            {question.option2}
                        </span>
                    </div>
                </div>
                <div className="question__options--2">
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option3"}
                name={number}
                aria-label="option 3"
               
              />
              <span className="question__options--optionText">
                {question.option3}
              </span>
            </div>
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option4"}
                name={number}
                aria-label="option 4"
         
              />
              <span className="question__options--optionText">
                {question.option4}
              </span>
            </div>
          </div>
          </InputGroup>
            </div>
            {isAdmin && (
        <div>
          <p
            style={{ margin: "5px" }}
          >{`Correct Answer: ${question[answer]}`}</p>
          <hr />
          <div className="question__content--editButtons">
            <div
              onClick={() => updateQuestionHandler(question)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "rgb(68 177 49)",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >{`Update`}</div>

<div
              onClick={() => deleteQuestionHandler(question.quesId)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "red",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >{`Delete`}</div>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;

        