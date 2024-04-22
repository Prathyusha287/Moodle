package com.quizportal.repository;

import com.quizportal.model.Question;
import com.quizportal.model.Quiz;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
	  List<Question> findByQuiz(Quiz quiz);
}
