package com.quizportal.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.List;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@ToString
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


    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Question> questions = new ArrayList<>();

   /* @OneToMany(mappedBy = "quiz", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<QuizResult> quizResults = new ArrayList<>();*/

}
