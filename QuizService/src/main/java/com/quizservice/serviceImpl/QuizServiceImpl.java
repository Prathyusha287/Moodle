package com.quizservice.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizservice.entity.Quiz;
import com.quizservice.exceptions.ResourceNotFoundException;
import com.quizservice.repository.QuizRepository;
import com.quizservice.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	public QuizRepository quizRepository;

	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public List<Quiz> getQuizzes() {
		return this.quizRepository.findAll();
	}

	@Override
	public Optional<Quiz> getQuiz(Long quizId) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		Optional<Quiz> quiz = null;

		if (quizRepository.findById(quizId) != null) {
			quiz = quizRepository.findById(quizId);
		} else {
			throw new ResourceNotFoundException("Quiz with given ID doesn't exist");
		}
		return quiz;
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		Quiz existingQuiz = this.quizRepository.findById(quiz.getQuizId()).get();
		existingQuiz.setDescription(quiz.getDescription());
		existingQuiz.setMaxMarks(quiz.getMaxMarks());
		existingQuiz.setNumberOfQuestions(quiz.getNumberOfQuestions());
		existingQuiz.setQuizId(quiz.getQuizId());
		existingQuiz.setTitle(quiz.getTitle());

		Quiz updatedQuiz = this.quizRepository.save(existingQuiz);

		return updatedQuiz;
		// return quizRepository.save(quiz);
	}

	@Override
	public void deleteQuiz(Long quizId) {
		quizRepository.deleteById(quizId);
	}

}
