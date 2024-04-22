import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../../components/Question";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "./ViewQuestions.css";

const ViewQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);

  let answers = {};

  const getQuiz = async () => {
    try {
      await axios.get(`http://localhost:8086/quiz/${quizId}`).then((res) => {
        console.log(res.data);
        setQuiz(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const evaluateQuiz = (quiz, answers) => {
    let marksGot = 0;

    let maxMarks = quiz.maxMarks;
    let noOfQstns = quiz.questions.length;
    let marksSingle = maxMarks / noOfQstns;

    quiz.questions.forEach((question) => {
      const givenAnswer = answers[question.quesId];
      if (givenAnswer === question.answer) {
        marksGot = marksGot + marksSingle;
      }
    });
    console.log("marksGot", marksGot);
    swal({
      title: "Results",
      text: `Score : ${marksGot}`,
      icon: "success",
    }).then(() => {
      navigate("/quizzes");
    });
  };
  const submitQuizHandler = () => {
    const answers = JSON.parse(localStorage.getItem("answers"));

    console.log("answers", answers);
    swal({
      title: "Are you sure?",
      text: "Once submitted, you will not be able to modify your answers!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSubmit) => {
      console.log("quiz", quiz);
      if (willSubmit) {
        evaluateQuiz(quiz, answers);
      }
    });
  };
  return (
    <div className="viewQuestions__container">
      <div className="viewQuestions__content">
        <h2>{quiz.title}</h2>

        {quiz.questions ? (
          quiz.questions.map((q, index) => {
            return (
              <Question
                key={index}
                number={index + 1}
                question={q}
                quizId={quiz.quizId}
              />
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
        <Button
          className="viewQuestions__content--button"
          onClick={() => submitQuizHandler()}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default ViewQuestions;
