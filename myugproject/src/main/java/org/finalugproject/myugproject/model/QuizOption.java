package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "quizz_options")
public class QuizOption {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_option_id")
    private long quizOptionId;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonManagedReference
    private Quiz quiz;

    @Column(name = "option_text")
    private String optionText;

    @Column(name = "is_correct")
    private boolean isCorrect;

    private String explanation;

    public QuizOption() {
    }


    public QuizOption(long quizOptionId, Quiz quiz, String optionText, boolean isCorrect, String explanation) {
        this.quizOptionId = quizOptionId;
        this.quiz = quiz;
        this.optionText = optionText;
        this.isCorrect = isCorrect;
        this.explanation = explanation;
    }

    public long getQuizOptionId() {
        return quizOptionId;
    }

    public void setQuizOptionId(long quizOptionId) {
        this.quizOptionId = quizOptionId;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }


    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
