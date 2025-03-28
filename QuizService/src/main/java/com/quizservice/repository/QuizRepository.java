package com.quizservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizservice.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

}
