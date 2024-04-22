package com.questionservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.questionservice.entity.Question;
import com.questionservice.service.QuestionService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/question")
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	// create question
	@PostMapping("/{quizId}")
	public ResponseEntity<?> addQuestion(@PathVariable Long quizId, @RequestBody Question question) {
		log.info("inside  class !!! QuestionController, method!!! : addQuestion");
		return ResponseEntity.ok(questionService.addQuestion(quizId, question));
	}

	// get questions
	@GetMapping("/")
	public ResponseEntity<?> getQuestions() {
		log.info("inside class!!! QuestionController ,method!!!:getQuestions ");
		return ResponseEntity.ok(questionService.getQuestions());
	}

	// get question
	@GetMapping("/{questionId}")
	public ResponseEntity<?> getQuestion(@PathVariable Long questionId) {
		log.info("inside class!!! QuestionController ,method!!!:getQuestion ");
		return ResponseEntity.ok(questionService.getQuestion(questionId));
	}

	// update question
	@PutMapping("{questionId}")
	public ResponseEntity<?> updateQuestion(@PathVariable Long questionId, @RequestBody Question question) {
		log.info("inside class!!! QuestionController ,method!!!:updateQuestion ");
		if (questionService.getQuestion(questionId) != null) {
			question.setQuesId(questionId);
			Question updatedQuestion = questionService.updateQuestion(question);
			return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Question with id : " + String.valueOf(questionId) + ", doesn't exists");
		}

	}

	// delete question
	@DeleteMapping("/{questionId}")
	public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
		log.info("inside class!!! QuestionController ,method!!!:deleteQuestion ");
		questionService.deleteQuestion(questionId);
		return ResponseEntity.ok(true);
	}

	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long quizId) {
		log.info("inside class!!! QuestionController ,method!!!:getQuestionsofQuiz ");

		return ResponseEntity.ok(questionService.getQuestionsByQuizId(quizId));

	}

}
