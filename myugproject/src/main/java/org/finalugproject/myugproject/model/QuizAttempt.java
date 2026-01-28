package org.finalugproject.myugproject.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Long attemptId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private MyUser user;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId; // Foreign key reference to the Lesson (assuming Lesson is another entity)

    @Column(name = "total_quizzes", nullable = false)
    private Integer totalQuizzes;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    // We will use LocalDateTime for the attempt date/time
    @Column(name = "attempt_date")
    private LocalDateTime attemptDate;

    // Constructors, Getters, and Setters

    public QuizAttempt() {
        this.attemptDate = LocalDateTime.now();
    }

    // Minimal constructor for creation
    public QuizAttempt(MyUser user, Long lessonId, Integer totalQuizzes, Integer correctAnswers) {
        this.user = user;
        this.lessonId = lessonId;
        this.totalQuizzes = totalQuizzes;
        this.correctAnswers = correctAnswers;
        this.attemptDate = LocalDateTime.now();
    }

    // --- Getters and Setters ---

    public Long getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Long attemptId) {
        this.attemptId = attemptId;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Integer getTotalQuizzes() {
        return totalQuizzes;
    }

    public void setTotalQuizzes(Integer totalQuizzes) {
        this.totalQuizzes = totalQuizzes;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public LocalDateTime getAttemptDate() {
        return attemptDate;
    }

    public void setAttemptDate(LocalDateTime attemptDate) {
        this.attemptDate = attemptDate;
    }
}