package com.quizportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizportal.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz,Long>{

}
