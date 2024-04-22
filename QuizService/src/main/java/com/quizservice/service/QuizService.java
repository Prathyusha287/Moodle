package com.quizservice.service;

import java.util.List;

import com.quizservice.entity.Quiz;

public interface QuizService {
	Quiz addQuiz(Quiz quiz);

	List<Quiz> getQuizzes();

	Quiz getQuiz(Long quizId);

	Quiz updateQuiz(Quiz quiz);

	void deleteQuiz(Long quizId);

}