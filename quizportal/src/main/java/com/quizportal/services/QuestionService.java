package com.quizportal.services;

import java.util.List;

import com.quizportal.model.Question;
import com.quizportal.model.Quiz;

public interface QuestionService {


    Question addQuestion(Question question);

    List<Question> getQuestions();

    Question getQuestion(Long quesId);

    Question updateQuestion(Question question);

    void deleteQuestion(Long questionId);

  
    List<Question> getQuestionsByQuiz(Quiz quiz);
}
