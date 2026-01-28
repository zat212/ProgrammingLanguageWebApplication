package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id")
    private long quizId;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    @JsonManagedReference
    private Lesson lesson;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<QuizOption> quizOptions;

    @Column(name = "quiz_text")
    private String quizText;

    @Column(name = "quiz_type")
    private String quizType;

    public Quiz() {
    }

    public Quiz(long quizId, Lesson lesson, List<QuizOption> quizOptions, String quizText, String quizType) {
        this.quizId = quizId;
        this.lesson = lesson;
        this.quizOptions = quizOptions;
        this.quizText = quizText;
        this.quizType = quizType;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public List<QuizOption> getQuizOptions() {
        return quizOptions;
    }

    public void setQuizOptions(List<QuizOption> quizOptions) {
        this.quizOptions = quizOptions;
    }

    public String getQuizText() {
        return quizText;
    }

    public void setQuizText(String quizText) {
        this.quizText = quizText;
    }

    public String getQuizType() {
        return quizType;
    }

    public void setQuizType(String quizType) {
        this.quizType = quizType;
    }
}
