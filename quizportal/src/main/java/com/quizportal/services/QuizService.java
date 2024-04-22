package com.quizportal.services;

import java.util.List;

import com.quizportal.model.Quiz;

public interface QuizService {
	 Quiz addQuiz(Quiz quiz);

	    List<Quiz> getQuizzes();

	    Quiz getQuiz(Long quizId);

	    Quiz updateQuiz(Quiz quiz);

	    void deleteQuiz(Long quizId);


}
