package com.questionservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.questionservice.entity.Question;
import com.questionservice.repository.QuestionRepository;
import com.questionservice.service.QuestionService;

@SpringBootTest
public class QuestionServiceTest {

	@Autowired
	private QuestionService service;

	@MockBean
	private QuestionRepository repository;

	@Test
	public void getQuestionsTest() {
		Question q = new Question();
		q.setQuesId(1l);
		q.setQuizId(1l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		when(repository.findAll()).thenReturn(Stream.of(q).collect(Collectors.toList()));
		assertEquals(1, service.getQuestions().size());
	}

	@Test
	public void addQuestionTest() {
		Question q = new Question();
		q.setQuesId(1l);
		q.setQuizId(1l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		when(repository.save(q)).thenReturn(q);
		assertEquals(q, service.addQuestion(q.getQuizId(), q));
	}

	@Test
	public void getQuestionTest() {
		Question q = new Question();
		long id = 1l;

		q.setQuesId(1l);
		q.setQuizId(2l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		doReturn(Optional.of(q)).when(repository).findById(id);
		Question ActualQuestion = service.getQuestion(id);
		assertEquals(Optional.of(q), Optional.of(ActualQuestion));
	}

	@Test
	public void deleteQuestionTest() {
		Question q = new Question();
		q.setQuesId(1l);
		q.setQuizId(1l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		long id = q.getQuesId();
		doReturn(q).when(repository).save(q);
		if (repository.findById(id).isPresent()) {
			service.deleteQuestion(id);
			verify(repository, times(1)).deleteById(id);
		}
	}

	@Test
	public void updateQuestionTest() {
		Question q = new Question();
		q.setQuesId(1l);
		q.setQuizId(1l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		long id = q.getQuesId();
		if (repository.findById(id).isPresent()) {
			Question ques = repository.findById(id).get();
			ques.setOption4("Chennai");
			repository.save(ques);
			assertNotEquals(ques, service.updateQuestion(q));
		}
	}

	@Test
	public void getQuestionsOfQuizTest() {
		Question q = new Question();
		long quizId = 2l;

		q.setQuesId(1l);
		q.setQuizId(2l);
		q.setContent("What is the capital of India?");
		q.setAnswer("Delhi");
		q.setOption1("Delhi");
		q.setOption2("Mumbai");
		q.setOption3("Hyderabad");
		q.setOption4("Pune");
		when(repository.findByQuizId(quizId)).thenReturn(Stream.of(q).collect(Collectors.toList()));
		assertEquals(1, service.getQuestionsByQuizId(quizId).size());

	}

}
