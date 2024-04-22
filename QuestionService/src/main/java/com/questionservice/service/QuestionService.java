package com.questionservice.service;

import java.util.List;

import com.questionservice.entity.Question;

public interface QuestionService {

	Question addQuestion(Long quizId, Question question);

	List<Question> getQuestions();

	Question getQuestion(Long quesId);

	Question updateQuestion(Question question);

	void deleteQuestion(Long questionId);

	List<Question> getQuestionsByQuizId(Long quizId);

}
