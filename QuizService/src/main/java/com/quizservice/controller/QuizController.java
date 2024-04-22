package com.quizservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizservice.entity.Quiz;
import com.quizservice.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizService quizService;

	// add quiz
	@PostMapping("/")
	public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(quizService.addQuiz(quiz));
	}

	// get quizzes
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes() {
		return ResponseEntity.ok(quizService.getQuizzes());
	}

	// get quiz
	@GetMapping("{quizId}")
	public ResponseEntity<?> getQuiz(@PathVariable Long quizId) {
		return ResponseEntity.ok(quizService.getQuiz(quizId));
	}

	// update quiz
	@PutMapping("{quizId}")
	public ResponseEntity<?> updateQuiz(@PathVariable Long quizId, @RequestBody Quiz quiz) {
		quiz.setQuizId(quizId);
		if (quizService.getQuiz(quizId) != null) {
			Quiz updatedQuiz = quizService.updateQuiz(quiz);

			return new ResponseEntity<>(updatedQuiz, HttpStatus.OK);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("Quiz with id : " + String.valueOf(quizId) + ", doesn't exists");
	}

	// delete quiz
	@DeleteMapping("/{quizId}")
	public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
		quizService.deleteQuiz(quizId);
		return ResponseEntity.ok(true);
	}

	/*
	 * @GetMapping("/{quizId}/") public ResponseEntity<?>
	 * getQuestionsOfQuiz(@PathVariable Long quizId) { Quiz quiz =
	 * this.quizService.getQuiz(quizId); List<Question> questions =
	 * quiz.getQuestions();
	 * 
	 * // if(questions.size()>quiz.getNumberOfQuestions()) { //
	 * questions=questions.subList(0,quiz.getNumberOfQuestions()+1); // }
	 * 
	 * return ResponseEntity.ok(questions);
	 * 
	 * }
	 */
}
