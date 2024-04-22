import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import "./ViewQuizzes.css";

import SidebarUser from "../../components/SidebarUser";
const ViewQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8086/quiz/`, {
      method: "GET",
    })
      .then((res) => (res = res.json()))
      .then((res) => {
        if (res.length > 0) {
          console.log(res);
          setQuizzes(res);
        }
      });
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/questions/${quizId}`);
  };
  const QuizCard = (q, index) => {
    return (
      <Col key={index} xl={3} lg={4} md={6} sm={6} xs={12} style={{}}>
        <Card
          bg="light"
          text="dark"
          style={{
            width: "100%",
            height: "95%",
            padding: "5px",
            margin: "auto",
            marginTop: "5px",
            minWidth: "0px",
            wordWrap: "break-word",
          }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>{q.title}</Card.Title>
            <Card.Text>{q.description}</Card.Text>
            <div className="viewQuizzes__content--ButtonsList">
              <div
                className="viewQuizzes__content--Button"
                onClick={() => handleQuizClick(q.quizId)}
                style={{}}
              >
                {`Start`}
              </div>

              <div
                className="viewQuizzes__content--Button"
                onClick={() => console.log("View")}
                style={{ color: "black", backgroundColor: "white" }}
              >{`${q.numberOfQuestions} Questions`}</div>

              <div
                className="viewQuizzes__content--Button"
                onClick={() => console.log("View")}
                style={{ color: "black", backgroundColor: "white" }}
              >{`Marks : ${q.maxMarks}`}</div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div className="viewQuizzes__container">
      <div className="viewQuizzes__sidebar">
        <SidebarUser />
      </div>
      <div className="viewQuizzes__content">
        {quizzes ? (
          quizzes.length === 0 ? (
            <h2>No quizzes are present. Try adding some quizzes.</h2>
          ) : (
            <Row>
              {quizzes.map((q) => (
                <QuizCard key={q.quizId} {...q} />
              ))}
            </Row>
          )
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default ViewQuizzes;
