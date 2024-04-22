package com.quizservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quizzes")
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quizId;

	@Column(name = "title")
	private String title;

	@Column(name = "description", length = 5000)
	private String description;

	@Column(name = "max_marks")
	private int maxMarks;

	@Column(name = "number_of_questions")
	private int numberOfQuestions;

	/*
	 * if fetchType.Lazy then when called quiz ,questions will not be displayed.If
	 * its own getters are called then it will e displayed
	 * 
	 * if fetchtype.Eager then questions will be displayed.
	 */

	/*
	 * @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade =
	 * CascadeType.ALL)
	 * 
	 * @JsonIgnore private List<Question> questions = new ArrayList<>();
	 */

}
