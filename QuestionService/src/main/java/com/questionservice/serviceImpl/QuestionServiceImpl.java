package com.questionservice.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.questionservice.entity.Question;
import com.questionservice.exception.ResourceNotFoundException;
import com.questionservice.repository.QuestionRepository;
import com.questionservice.service.QuestionService;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class QuestionServiceImpl implements QuestionService {
	@Autowired
	QuestionRepository questionRepository;

	@Override
	public Question addQuestion(Long quizId, Question question) {
		log.info("inside class!!! QuestionServiceImpl,method!!!:addQuestions");
		question.setQuizId(quizId);
		return this.questionRepository.save(question);
	}

	@Override
	public List<Question> getQuestions() {
		log.info("inside class!!! QuestionServiceImpl,method!!!:getQuestions");
		return this.questionRepository.findAll();
	}

	@Override
	public Question getQuestion(Long quesId) throws ResourceNotFoundException {
		log.info("inside class!!! QuestionServiceImpl,method!!!:getQuestion", quesId);

		Question ques = questionRepository.findById(quesId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found"));

		return ques;
	}

	@Override
	public Question updateQuestion(Question question) {
		log.info("inside class!!! QuestionServiceImpl,method!!!:updateQuestion");
		Question existingQuestion = this.questionRepository.findById(question.getQuesId()).get();
		existingQuestion.setContent(question.getContent());
		existingQuestion.setOption1(question.getOption1());
		existingQuestion.setOption2(question.getOption2());
		existingQuestion.setOption3(question.getOption3());
		existingQuestion.setOption4(question.getOption4());
		existingQuestion.setAnswer(question.getAnswer());
		Question updatedQuestion = this.questionRepository.save(existingQuestion);
		return updatedQuestion;
	}

	@Override
	public void deleteQuestion(Long questionId) {
		log.info("inside class!!! QuestionServiceImpl,method!!!:deleteQuestion");
		this.questionRepository.deleteById(questionId);
	}

	@Override
	public List<Question> getQuestionsByQuizId(Long quizId) {
		log.info("inside class!!! QuestionServiceImpl,method!!!:getQuestionsByQuizId");
		return this.questionRepository.findByQuizId(quizId);
	}

}
