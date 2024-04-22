package com.quizportal.servicesimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizportal.model.Question;
import com.quizportal.model.Quiz;
import com.quizportal.repository.QuestionRepository;
import com.quizportal.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {
	 @Autowired
	    QuestionRepository questionRepository;

	    @Override
	    public Question addQuestion(Question question) {
	        return questionRepository.save(question);
	    }

	    @Override
	    public List<Question> getQuestions() {
	        return questionRepository.findAll();
	    }

	    @Override
	    public Question getQuestion(Long quesId) {
	        return questionRepository.findById(quesId).isPresent() ? questionRepository.findById(quesId).get() : null;
	    }

	    @Override
	    public Question updateQuestion(Question question) {
	        return questionRepository.save(question);
	    }

	    @Override
	    public void deleteQuestion(Long questionId) {
	        questionRepository.delete(getQuestion(questionId));
	    }

	    @Override
	    public List<Question> getQuestionsByQuiz(Quiz quiz) {
	        return questionRepository.findByQuiz(quiz);
	    }

}
